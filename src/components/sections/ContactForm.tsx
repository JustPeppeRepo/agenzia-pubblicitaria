"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm leading-6 text-foreground/70">
        Grazie per il messaggio! In produzione collegherai questo modulo a un
        servizio di invio email (es. Resend, Formspree o API Route).
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Nome</span>
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Messaggio</span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-1 w-full resize-none rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Invia messaggio
      </button>
    </form>
  );
}
