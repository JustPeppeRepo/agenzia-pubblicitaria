import { NextResponse, type NextRequest } from "next/server";
import {
  API_GLOBAL_RATE_LIMIT,
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

/**
 * Next.js 16 `proxy.ts` (ex middleware): coarse DoS / abuse guard for /api/*.
 * Fine-grained limits (contact burst + hourly) live in the route handlers.
 * Runs on the Node.js runtime.
 */
export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const result = await rateLimit(`api:${ip}`, API_GLOBAL_RATE_LIMIT);

  if (!result.success) {
    return NextResponse.json(
      { error: "Troppi tentativi. Riprova tra qualche minuto." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(result),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const response = NextResponse.next();
  response.headers.set(
    "X-RateLimit-Remaining",
    String(Math.max(0, result.remaining)),
  );
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
