import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatEmailLink(email: string): string {
  return `mailto:${email}`;
}

export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function formatWhatsAppLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Validates contact form fields client-side */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Il nome deve contenere almeno 2 caratteri.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Il messaggio deve contenere almeno 10 caratteri.";
  }

  return errors;
}
