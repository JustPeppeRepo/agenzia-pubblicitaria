/**
 * @file API `POST /api/contact`
 * @description Valida e rate-limita i submit del form; non invia email (FormSubmit client-side).
 *
 * Helpers: validateContactPayload(), rateLimit(), getClientIp(), getSiteUrl()
 * Protections: Origin check, body size, Content-Type, honeypot, 429
 */
import { NextResponse } from "next/server";
import {
  CONTACT_HONEYPOT_FIELD,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { getSiteUrl } from "@/lib/seo";
import {
  CONTACT_MAX_BODY_BYTES,
  CONTACT_RATE_LIMITS,
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tooManyRequests(result: Awaited<ReturnType<typeof rateLimit>>) {
  return NextResponse.json(
    { error: "Troppi tentativi. Riprova tra qualche minuto." },
    {
      status: 429,
      headers: rateLimitHeaders(result),
    },
  );
}

/** Allow only same-origin / known deployment origins (CSRF cushion). */
function allowedOrigins(request: Request): Set<string> {
  const origins = new Set<string>();

  try {
    origins.add(new URL(getSiteUrl()).origin);
  } catch {
    /* ignore invalid site URL */
  }

  try {
    origins.add(new URL(request.url).origin);
  } catch {
    /* ignore */
  }

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    origins.add(
      vercelUrl.startsWith("http") ? new URL(vercelUrl).origin : `https://${vercelUrl}`,
    );
  }

  return origins;
}

function isAllowedOrigin(request: Request): boolean {
  const allowed = allowedOrigins(request);

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return allowed.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return allowed.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  // Non-browser clients without Origin/Referer — reject in production.
  return process.env.NODE_ENV !== "production";
}

/**
 * Validates + rate-limits contact submissions.
 * Email delivery happens in the browser (FormSubmit rejects server-side fetch).
 * Never returns stack traces or env details.
 */
export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type non supportato." },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (
      Number.isFinite(contentLength) &&
      contentLength > CONTACT_MAX_BODY_BYTES
    ) {
      return NextResponse.json(
        { error: "Payload troppo grande." },
        { status: 413 },
      );
    }

    const ip = getClientIp(request);

    const burst = await rateLimit(`contact:${ip}`, CONTACT_RATE_LIMITS.burst);
    if (!burst.success) return tooManyRequests(burst);

    const hourly = await rateLimit(`contact:${ip}`, CONTACT_RATE_LIMITS.hour);
    if (!hourly.success) return tooManyRequests(hourly);

    const raw = await request.text();
    if (raw.length > CONTACT_MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload troppo grande." },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(raw) as unknown;
    } catch {
      return NextResponse.json(
        { error: "Richiesta non valida." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Richiesta non valida." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const validation = validateContactPayload({
      name: typeof payload.name === "string" ? payload.name : "",
      email: typeof payload.email === "string" ? payload.email : "",
      message: typeof payload.message === "string" ? payload.message : "",
      website:
        typeof payload[CONTACT_HONEYPOT_FIELD] === "string"
          ? (payload[CONTACT_HONEYPOT_FIELD] as string)
          : "",
    } satisfies ContactPayload);

    // Honeypot trip: pretend success so bots don't adapt (no delivery payload).
    if (!validation.ok && validation.honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!validation.ok) {
      return NextResponse.json(
        { error: "Dati non validi.", errors: validation.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: true, data: validation.data },
      {
        headers: {
          "Cache-Control": "no-store",
          ...rateLimitHeaders(hourly),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Errore interno. Riprova più tardi." },
      { status: 500 },
    );
  }
}

/** Explicitly reject other verbs with a clean response (no stack). */
export function GET() {
  return NextResponse.json({ error: "Metodo non consentito." }, { status: 405 });
}
