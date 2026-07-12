import type { NavLink, SiteConfig, ValueProposition } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Marco Dev",
  role: "Frontend Engineer & Creative Developer",
  tagline: "Siti web veloci, animati e costruiti per convertire",
  description:
    "Sviluppo portfolio e siti vetrina ad alte prestazioni con Next.js, animazioni fluide e architetture data-driven — senza database, senza compromessi.",
  email: "ciao@marcoddev.it",
  phone: "+39 333 123 4567",
  location: "Milano, Italia",
  social: [
    {
      platform: "linkedin",
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      platform: "github",
      href: "https://github.com",
      label: "GitHub",
    },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contatti", href: "/contact" },
];

export const valuePropositions: ValueProposition[] = [
  {
    id: "performance",
    title: "Performance misurabili",
    description:
      "Ogni sito punta a Lighthouse 95+. Ottimizzo immagini AVIF/WebP, font self-hosted e code splitting per FCP sotto i 1.2s.",
    metric: "LCP < 1.5s",
    icon: "⚡",
  },
  {
    id: "seo",
    title: "SEO nativa con Next.js",
    description:
      "Metadata dinamici, SSG e structured data integrati. I tuoi contenuti sono indicizzabili dal giorno zero.",
    metric: "100 SEO score",
    icon: "🔍",
  },
  {
    id: "animations",
    title: "Animazioni che vendono",
    description:
      "Micro-interazioni e scroll animations con Framer Motion — fluide, accessibili e rispettose di prefers-reduced-motion.",
    metric: "60fps costanti",
    icon: "✨",
  },
  {
    id: "code",
    title: "Codice production-ready",
    description:
      "TypeScript strict, zero dipendenze sperimentali, architettura modulare. Manutenibile da chiunque nel tuo team.",
    metric: "0 tech debt",
    icon: "🛠",
  },
];

export const aboutBrief =
  "Sono uno sviluppatore frontend specializzato in esperienze web ad alte prestazioni. Trasformo brief creativi in prodotti digitali veloci, accessibili e memorabili — dal concept al deploy.";

export const aboutDetailed = {
  intro:
    "Ho iniziato a programmare oltre 8 anni fa, spinto dalla curiosità di capire come funzionassero le interfacce che usavo ogni giorno. Oggi lavoro con brand e freelance che vogliono distinguersi online con siti che non solo bello da vedere, ma tecnicamente impeccabili.",
  philosophy:
    "Credo che la migliore UX sia quella che non si nota: caricamenti istantanei, animazioni naturali, zero attrito. Ogni scelta tecnica serve un obiettivo business — conversioni, SEO, fiducia del brand.",
  journey: [
    {
      year: "2018",
      title: "Primi progetti freelance",
      description: "Landing page e siti WordPress custom per PMI locali.",
    },
    {
      year: "2021",
      title: "Specializzazione React/Next.js",
      description: "Migrazione verso stack moderni JAMstack e SSG.",
    },
    {
      year: "2024",
      title: "Focus performance & motion",
      description: "Portfolio ad alte prestazioni con animazioni creative.",
    },
  ],
};
