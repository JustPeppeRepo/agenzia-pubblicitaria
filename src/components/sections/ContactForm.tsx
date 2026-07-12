"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { validateContactForm } from "@/lib/utils";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormData = { name: "", email: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center py-8 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-3xl"
          >
            ✓
          </motion.span>
          <h3 className="text-xl font-semibold">Messaggio inviato!</h3>
          <p className="mt-2 max-w-sm text-sm text-foreground/65">
            Grazie {form.name.split(" ")[0]}! Ti risponderò entro 24 ore a{" "}
            {form.email}.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Field
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            label="Messaggio"
            name="message"
            as="textarea"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
          />
          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Invia messaggio
          </button>
        </motion.form>
      )}
    </AnimatePresence>
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
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
}: FieldProps) {
  const inputClasses =
    "mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40 " +
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
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-500"
        >
          {error}
        </motion.p>
      ) : null}
    </label>
  );
}

export function ContactLinks() {
  return (
    <ul className="mt-8 space-y-3 text-sm">
      <li>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-foreground/70 transition-colors hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </li>
      {siteConfig.social.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            {link.label} →
          </a>
        </li>
      ))}
    </ul>
  );
}
