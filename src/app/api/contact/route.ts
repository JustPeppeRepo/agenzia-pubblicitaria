import { NextResponse } from "next/server";
import {
  CONTACT_HONEYPOT_FIELD,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * Validates + rate-limits contact submissions.
 * Email delivery happens in the browser (FormSubmit rejects server-side fetch).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, {
    limit: MAX_REQUESTS,
    windowMs: WINDOW_MS,
  });

  if (!limited.success) {
    return NextResponse.json(
      { error: "Troppi tentativi. Riprova tra qualche minuto." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((limited.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const payload = body as ContactPayload & Record<string, unknown>;
  const validation = validateContactPayload({
    name: typeof payload.name === "string" ? payload.name : "",
    email: typeof payload.email === "string" ? payload.email : "",
    message: typeof payload.message === "string" ? payload.message : "",
    website:
      typeof payload[CONTACT_HONEYPOT_FIELD] === "string"
        ? (payload[CONTACT_HONEYPOT_FIELD] as string)
        : "",
  });

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

  return NextResponse.json({ ok: true, data: validation.data });
}
