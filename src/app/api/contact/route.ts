import { Resend } from "resend";
import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import {
  CONTACT_HONEYPOT_FIELD,
  sanitizeHeaderValue,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  // Honeypot trip: pretend success so bots don't adapt.
  if (!validation.ok && validation.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!validation.ok) {
    return NextResponse.json(
      { error: "Dati non validi.", errors: validation.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? `noreply@${new URL(siteConfig.url).hostname}`;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Servizio email non configurato." },
      { status: 503 },
    );
  }

  const { name, email, message } = validation.data;
  const subject = sanitizeHeaderValue(
    `Nuovo contatto da ${name} — ${siteConfig.name}`,
  ).slice(0, 120);

  const textBody = [
    `Nome: ${name}`,
    `Email: ${email}`,
    "",
    "Messaggio:",
    message,
  ].join("\n");

  const htmlBody = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Messaggio:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Invio non riuscito. Riprova più tardi." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }
}
