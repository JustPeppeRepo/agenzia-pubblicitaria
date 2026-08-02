import type { Technology } from "@/types";

/* About page — stack tecnico (Giuseppe) */
export const technologies: Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    icon: "▲",
    category: "frontend",
    shortDescription: "React framework con SSR/SSG",
    whyChosen:
      "Scelgo Next.js per la SEO nativa, il rendering ibrido (SSG + ISR) e l'Image Optimization integrata. Permette di servire pagine statiche velocissime mantenendo la flessibilità di route dinamiche.",
    url: "https://nextjs.org",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "TS",
    category: "frontend",
    shortDescription: "Type-safety end-to-end",
    whyChosen:
      "TypeScript riduce bug in produzione e rende i refactoring sicuri. Con tipi condivisi tra data layer e componenti, l'intero portfolio resta coerente e manutenibile.",
    url: "https://www.typescriptlang.org",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "🎨",
    category: "frontend",
    shortDescription: "Utility-first CSS",
    whyChosen:
      "Tailwind elimina CSS morto dal bundle finale e accelera lo sviluppo responsive. Con v4 e @theme inline, il design system resta centralizzato e performante.",
    url: "https://tailwindcss.com",
  },
  {
    id: "react",
    name: "React 19",
    icon: "⚛",
    category: "frontend",
    shortDescription: "UI library component-based",
    whyChosen:
      "React resta lo standard de facto per UI complesse. Con Server Components di Next.js, separo logica server-side da interattività client-side in modo netto.",
    url: "https://react.dev",
  },
  {
    id: "express",
    name: "Express",
    icon: "EX",
    category: "backend",
    shortDescription: "API REST veloci e leggere",
    whyChosen:
      "Express è il framework Node.js più collaudato per API REST e middleware custom. Lo uso quando serve un backend snello, integrazioni terze parti o logica server dedicata.",
    url: "https://expressjs.com",
  },
  {
    id: "prisma",
    name: "Prisma",
    icon: "◇",
    category: "backend",
    shortDescription: "ORM type-safe per database",
    whyChosen:
      "Prisma offre migrazioni, query type-safe e un client generato automaticamente. Riduce errori sui dati e accelera lo sviluppo con PostgreSQL, MySQL o SQLite.",
    url: "https://www.prisma.io",
  },
  {
    id: "framer",
    name: "Framer Motion",
    icon: "◎",
    category: "frontend",
    shortDescription: "Animazioni dichiarative",
    whyChosen:
      "Framer Motion offre API React-native per animazioni scroll e hover, con supporto built-in per prefers-reduced-motion. Tree-shakeable e stabile in produzione.",
    url: "https://motion.dev",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "▲",
    category: "tooling",
    shortDescription: "Deploy, preview e edge network",
    whyChosen:
      "Vercel è la piattaforma nativa per Next.js: deploy automatici da Git, preview URL per ogni PR, CDN globale e integrazione con Analytics e Speed Insights già attive su questo sito.",
    url: "https://vercel.com",
  },
];

const featuredIds = [
  "nextjs",
  "typescript",
  "tailwind",
  "react",
  "express",
  "prisma",
] as const;

/** Home — AboutBrief, strip “Stack principale” */
export const featuredTechnologies = featuredIds.map(
  (id) => technologies.find((tech) => tech.id === id)!,
);

/* About page — strumenti marketing (Andrea) */
export const marketingTechnologies: Technology[] = [
  {
    id: "seo",
    name: "SEO",
    icon: "🔍",
    category: "marketing",
    shortDescription: "Visibilità organica su Google",
    whyChosen:
      "Ottimizziamo struttura, contenuti e performance del sito perché Google capisca subito chi sei e cosa offri. Risultato: traffico qualificato senza costi per click.",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    icon: "G",
    category: "marketing",
    shortDescription: "Campagne search e display",
    whyChosen:
      "Intercettiamo chi sta già cercando i tuoi servizi con annunci mirati. Budget controllato, keyword strategiche e landing page allineate al messaggio dell'annuncio.",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    icon: "M",
    category: "marketing",
    shortDescription: "Facebook e Instagram Ads",
    whyChosen:
      "Raggiungiamo il pubblico giusto sui social con creatività testate e audience segmentate. Ideale per brand awareness, lead generation e retargeting.",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    icon: "📈",
    category: "marketing",
    shortDescription: "Misurazione e conversioni",
    whyChosen:
      "Tracciamo ogni passaggio del visitatore — da dove arriva a cosa fa sul sito — per capire cosa funziona e dove migliorare. Dati reali, decisioni informate.",
  },
  {
    id: "content",
    name: "Content Strategy",
    icon: "✎",
    category: "marketing",
    shortDescription: "Copy e contenuti che convertono",
    whyChosen:
      "Ogni testo — dalla headline alla CTA — guida l'utente verso l'azione. Tono di voce coerente, messaggi chiari e struttura pensata per persuadere senza forzare.",
  },
  {
    id: "brand",
    name: "Brand Identity",
    icon: "◆",
    category: "marketing",
    shortDescription: "Posizionamento e identità visiva",
    whyChosen:
      "Definiamo come il brand si presenta online: palette, tono, gerarchia visiva. Un'identità riconoscibile aumenta fiducia e memorabilità in ogni touchpoint digitale.",
  },
];
