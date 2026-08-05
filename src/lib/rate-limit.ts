import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

/** Periodic cleanup so long-lived Node processes don't leak keys. */
const CLEANUP_EVERY = 200;
let opsSinceCleanup = 0;

function cleanupMemoryBuckets(now: number) {
  opsSinceCleanup += 1;
  if (opsSinceCleanup < CLEANUP_EVERY) return;
  opsSinceCleanup = 0;
  for (const [key, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(key);
  }
}

export type RateLimitOptions = {
  /** Max requests in the window */
  limit: number;
  /** Window length in milliseconds */
  windowMs: number;
  /**
   * Optional Upstash analytics prefix. Distinct prefixes = independent counters
   * (e.g. contact-hour vs contact-burst vs api-global).
   */
  prefix?: string;
};

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

function hasUpstashEnv(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter({
  limit,
  windowMs,
  prefix,
}: RateLimitOptions): Ratelimit {
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const key = `${prefix ?? "rl"}:${limit}:${windowSec}`;
  const existing = upstashLimiters.get(key);
  if (existing) return existing;

  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(limit, `${windowSec} s`),
    prefix: `portfolio:${prefix ?? "rl"}`,
    analytics: false,
  });
  upstashLimiters.set(key, limiter);
  return limiter;
}

function memoryRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  cleanupMemoryBuckets(now);
  const existing = memoryBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Rate limit by key. Uses Upstash Redis when env vars are set (multi-instance
 * safe); otherwise falls back to in-memory fixed window (single instance).
 */
export async function rateLimit(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  if (hasUpstashEnv()) {
    try {
      const limiter = getUpstashLimiter(options);
      const result = await limiter.limit(key);
      return {
        success: result.success,
        remaining: result.remaining,
        resetAt: result.reset,
      };
    } catch {
      // Redis unreachable — degrade to memory rather than open the floodgates.
      return memoryRateLimit(key, options);
    }
  }

  return memoryRateLimit(key, options);
}

/** Contact form: short burst + sustained hourly cap. */
export const CONTACT_RATE_LIMITS = {
  burst: { limit: 3, windowMs: 60_000, prefix: "contact-burst" },
  hour: { limit: 5, windowMs: 60 * 60_000, prefix: "contact-hour" },
} as const;

/** Global /api/* guard in middleware (DoS / scraper cushion). */
export const API_GLOBAL_RATE_LIMIT = {
  limit: 60,
  windowMs: 60_000,
  prefix: "api-global",
} as const;

/** Max JSON body size for contact (bytes). */
export const CONTACT_MAX_BODY_BYTES = 8_192;

/**
 * Best-effort client IP from common proxy headers.
 * Prefer the first X-Forwarded-For hop set by the trusted edge (Vercel).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  return "unknown";
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "Retry-After": String(
      Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000)),
    ),
    "X-RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}
