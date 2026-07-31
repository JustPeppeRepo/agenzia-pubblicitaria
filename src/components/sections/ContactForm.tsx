"use client";

import { useState } from "react";
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_LIMITS,
  toPlainText,
  validateContactForm,
} from "@/lib/contact";

type FormData = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          [CONTACT_HONEYPOT_FIELD]: form.website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (res.status === 429) {
        setFormError(
          data.error ?? "Troppi tentativi. Riprova tra qualche minuto.",
        );
        return;
      }

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(data.error ?? "Invio non riuscito. Riprova più tardi.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Connessione non disponibile. Riprova più tardi.");
    } finally {
      setSubmitting(false);
    }
  }

  const safeFirstName = toPlainText(form.name).split(" ")[0] || "là";
  const safeEmail = toPlainText(form.email);

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-3xl">
          ✓
        </span>
        <h3 className="text-xl font-semibold">Messaggio inviato!</h3>
        <p className="mt-2 max-w-sm text-sm text-foreground/65">
          Grazie {safeFirstName}! Ti risponderò entro 24 ore a {safeEmail}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
      {/* Honeypot: hidden from humans, filled by many bots */}
      <div
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor={CONTACT_HONEYPOT_FIELD}>Sito web</label>
        <input
          id={CONTACT_HONEYPOT_FIELD}
          name={CONTACT_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <Field
        label="Nome"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        maxLength={CONTACT_LIMITS.nameMax}
        autoComplete="name"
        disabled={submitting}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        maxLength={CONTACT_LIMITS.emailMax}
        autoComplete="email"
        disabled={submitting}
      />
      <Field
        label="Messaggio"
        name="message"
        as="textarea"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        maxLength={CONTACT_LIMITS.messageMax}
        disabled={submitting}
      />

      {formError ? (
        <p className="text-sm text-red-500" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/25 transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  maxLength?: number;
  autoComplete?: string;
  disabled?: boolean;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  maxLength,
  autoComplete,
  disabled,
}: FieldProps) {
  const inputClasses =
    "mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40 disabled:opacity-60 " +
    (error ? "border-red-400" : "border-foreground/15");

  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete={autoComplete}
          disabled={disabled}
          className={inputClasses}
        />
      )}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}
