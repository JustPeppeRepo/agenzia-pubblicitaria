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

/* About page — strumenti marketing (Vito) */
export const marketingTechnologies: Technology[] = [
  {
    id: "gsc",
    name: "Google Search Console",
    icon: "GSC",
    category: "marketing",
    shortDescription: "Ranking, impression e CTR",
    whyChosen:
      "Monitoro come Google vede il sito: query, click organici e variazioni di ranking. È la base per capire cosa sta funzionando in SEO prima di toccare il budget ads.",
    url: "https://search.google.com/search-console",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    icon: "GA4",
    category: "marketing",
    shortDescription: "Traffico, eventi e conversioni",
    whyChosen:
      "Traccio utenti, bounce rate, pagine top e conversioni. Ogni decisione su ads e SEO parte da qui — senza dati reali non si scala.",
    url: "https://analytics.google.com",
  },
  {
    id: "screaming-frog",
    name: "Screaming Frog",
    icon: "SF",
    category: "marketing",
    shortDescription: "Crawl e audit SEO tecnico",
    whyChosen:
      "Eseguo crawl completi del sito per trovare errori tecnici, redirect e pagine deboli. L'audit iniziale guida fix con lo sviluppo e la priorità dei contenuti.",
    url: "https://www.screamingfrog.co.uk/seo-spider/",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    icon: "G",
    category: "marketing",
    shortDescription: "Campagne Search e budget",
    whyChosen:
      "Intercetto chi sta già cercando i tuoi servizi. Keyword, copy e negative keywords si aggiornano ogni settimana in base a CTR e ROAS.",
    url: "https://ads.google.com",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    icon: "M",
    category: "marketing",
    shortDescription: "Facebook e Instagram Ads",
    whyChosen:
      "Campagne su Meta con test A/B sulle creatività. Ideale per awareness, lead e retargeting — il budget sale solo dove il ROAS regge.",
    url: "https://www.facebook.com/business/ads",
  },
  {
    id: "hotjar",
    name: "Hotjar",
    icon: "HJ",
    category: "marketing",
    shortDescription: "Heatmap e session recording",
    whyChosen:
      "Vedo dove gli utenti cliccano e dove abbandonano. Heatmap e registrazioni spiegano i numeri di GA4 e guidano il CRO sulla landing.",
    url: "https://www.hotjar.com",
  },
  {
    id: "hubspot",
    name: "HubSpot CRO",
    icon: "HS",
    category: "marketing",
    shortDescription: "Conversion Rate Optimization",
    whyChosen:
      "Framework CRO per landing e funnel: ipotesi, test e iterazioni. Serve a trasformare il traffico (organico o a pagamento) in contatti misurabili.",
    url: "https://www.hubspot.com",
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    icon: "Ah",
    category: "marketing",
    shortDescription: "Keyword research avanzata",
    whyChosen:
      "Quando il progetto scala, approfondisco keyword e gap competitivi. Lo uso in fase di crescita, non dal giorno zero — solo se i dati giustificano l'investimento.",
    url: "https://ahrefs.com",
  },
];
