export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 4000,
} as const;

/** Honeypot field name — must stay empty for humans. */
export const CONTACT_HONEYPOT_FIELD = "website";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validateContactPayload(
  input: ContactPayload,
): ContactValidationResult {
  if (typeof input.website === "string" && input.website.trim().length > 0) {
    return { ok: false, errors: {}, honeypot: true };
  }

  const errors: Record<string, string> = {};

  const name = sanitizeHeaderValue(
    typeof input.name === "string" ? input.name : "",
  );
  const email = sanitizeHeaderValue(
    typeof input.email === "string" ? input.email : "",
  ).toLowerCase();
  const rawMessage = typeof input.message === "string" ? input.message : "";
  // Preserve newlines in the email body; strip markup / injection chars only.
  const message = rawMessage
    .replace(/<[^>]*>/g, "")
    .replace(/[<>&"'`]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, CONTACT_LIMITS.messageMax);

  if (name.length < CONTACT_LIMITS.nameMin) {
    errors.name = "Il nome deve contenere almeno 2 caratteri.";
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Il nome non può superare ${CONTACT_LIMITS.nameMax} caratteri.`;
  }

  if (!EMAIL_REGEX.test(email) || email.length > CONTACT_LIMITS.emailMax) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = "Il messaggio deve contenere almeno 10 caratteri.";
  } else if (rawMessage.trim().length > CONTACT_LIMITS.messageMax) {
    errors.message = `Il messaggio non può superare ${CONTACT_LIMITS.messageMax} caratteri.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, email, message },
  };
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
