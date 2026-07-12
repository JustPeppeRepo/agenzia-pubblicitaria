import type { Technology } from "@/types";

export const technologies: Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    icon: "▲",
    category: "frontend",
    shortDescription: "React framework con SSR/SSG",
    whyChosen:
      "Scelgo Next.js per la SEO nativa, il rendering ibrido (SSG + ISR) e l'Image Optimization integrata. Permette di servire pagine statiche velocissime mantenendo la flessibilità di route dinamiche.",
    proficiency: 95,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "TS",
    category: "frontend",
    shortDescription: "Type-safety end-to-end",
    whyChosen:
      "TypeScript riduce bug in produzione e rende i refactoring sicuri. Con tipi condivisi tra data layer e componenti, l'intero portfolio resta coerente e manutenibile.",
    proficiency: 90,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "🎨",
    category: "frontend",
    shortDescription: "Utility-first CSS",
    whyChosen:
      "Tailwind elimina CSS morto dal bundle finale e accelera lo sviluppo responsive. Con v4 e @theme inline, il design system resta centralizzato e performante.",
    proficiency: 92,
  },
  {
    id: "framer",
    name: "Framer Motion",
    icon: "◎",
    category: "frontend",
    shortDescription: "Animazioni dichiarative",
    whyChosen:
      "Framer Motion offre API React-native per animazioni scroll e hover, con supporto built-in per prefers-reduced-motion. Tree-shakeable e stabile in produzione.",
    proficiency: 88,
  },
  {
    id: "react",
    name: "React 19",
    icon: "⚛",
    category: "frontend",
    shortDescription: "UI library component-based",
    whyChosen:
      "React resta lo standard de facto per UI complesse. Con Server Components di Next.js, separo logica server-side da interattività client-side in modo netto.",
    proficiency: 93,
  },
  {
    id: "recharts",
    name: "Recharts",
    icon: "📊",
    category: "tooling",
    shortDescription: "Grafici React composable",
    whyChosen:
      "Per i case study uso Recharts: leggero, dichiarativo e perfetto per visualizzare metriche simulate in modo credibile senza appesantire il bundle homepage.",
    proficiency: 85,
  },
];

/** Subset shown on homepage */
export const featuredTechnologies = technologies.slice(0, 6);
