import { z } from "zod";

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 4000,
} as const;

/** Honeypot field name — must stay empty for humans. */
export const CONTACT_HONEYPOT_FIELD = "website";

/** Strip CR/LF and other controls that enable email header injection. */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\u0000-\u001f\u007f]/g, "").trim();
}

/** Plain-text only: strip tags and collapse whitespace for safe email bodies. */
export function toPlainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>&"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeMessage(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>&"'`]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, CONTACT_LIMITS.messageMax);
}

const contactFieldsSchema = z.object({
  name: z
    .string()
    .transform(sanitizeHeaderValue)
    .pipe(
      z
        .string()
        .min(CONTACT_LIMITS.nameMin, "Il nome deve contenere almeno 2 caratteri.")
        .max(
          CONTACT_LIMITS.nameMax,
          `Il nome non può superare ${CONTACT_LIMITS.nameMax} caratteri.`,
        ),
    ),
  email: z
    .string()
    .transform((v) => sanitizeHeaderValue(v).toLowerCase())
    .pipe(
      z
        .string()
        .email("Inserisci un indirizzo email valido.")
        .max(CONTACT_LIMITS.emailMax, "Inserisci un indirizzo email valido."),
    ),
  message: z
    .string()
    .max(
      CONTACT_LIMITS.messageMax,
      `Il messaggio non può superare ${CONTACT_LIMITS.messageMax} caratteri.`,
    )
    .transform(sanitizeMessage)
    .pipe(
      z
        .string()
        .min(
          CONTACT_LIMITS.messageMin,
          "Il messaggio deve contenere almeno 10 caratteri.",
        ),
    ),
});

/** Full payload including honeypot (server-side). */
export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — bots fill this; humans leave it empty. */
  website?: string;
};

export type ContactValidationResult =
  | { ok: true; data: { name: string; email: string; message: string } }
  | { ok: false; errors: Record<string, string>; honeypot?: boolean };

function zodIssuesToErrors(
  issues: z.ZodIssue[],
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function validateContactPayload(
  input: ContactPayload,
): ContactValidationResult {
  const website =
    typeof input.website === "string" ? input.website : "";

  if (website.trim().length > 0) {
    return { ok: false, errors: {}, honeypot: true };
  }

  const parsed = contactFieldsSchema.safeParse({
    name: typeof input.name === "string" ? input.name : "",
    email: typeof input.email === "string" ? input.email : "",
    message: typeof input.message === "string" ? input.message : "",
  });

  if (!parsed.success) {
    return { ok: false, errors: zodIssuesToErrors(parsed.error.issues) };
  }

  return { ok: true, data: parsed.data };
}

/** Client-side mirror of server rules (honeypot excluded). */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> {
  const result = validateContactPayload({ ...data, website: "" });
  return result.ok ? {} : result.errors;
}

/**
 * Deliver sanitized contact data via FormSubmit (browser fetch).
 * Must run client-side — FormSubmit rejects Node/server proxies.
 */
export async function deliverContactViaFormSubmit(options: {
  toEmail: string;
  siteName: string;
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const subject = sanitizeHeaderValue(
    `Nuovo contatto da ${options.name} — ${options.siteName}`,
  ).slice(0, 120);

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(options.toEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: options.name,
          email: options.email,
          message: options.message,
          _subject: subject,
          _replyto: options.email,
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
    } | null;

    return (
      res.ok &&
      data != null &&
      (data.success === true || data.success === "true")
    );
  } catch {
    return false;
  }
}
