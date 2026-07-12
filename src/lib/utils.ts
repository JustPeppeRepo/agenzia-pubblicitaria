export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function formatEmailLink(email: string): string {
  return `mailto:${email}`;
}
