import type { NavLink, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Studio Creativo",
  tagline: "Strategia, design e comunicazione che fanno la differenza",
  description:
    "Agenzia creativa specializzata in branding, campagne digitali e contenuti visivi per brand ambiziosi.",
  email: "ciao@studiocreativo.it",
  phone: "+39 02 1234 5678",
  address: "Via della Creatività 12, Milano",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Progetti", href: "/progetti" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
];
