import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "cage",
    title: "CAGE - escape room",
    excerpt:
      "Cage Escape Room è una piattaforma full-stack (Next.js + Prisma) che unisce vetrina immersiva e prenotazione online completa.",
    description:
      "Cage Escape Room è una piattaforma full-stack (Next.js + Prisma) che unisce vetrina immersiva e prenotazione online completa. Offre lato admin un pannello di gestione per il controllo delle prenotazioni e degli utenti.",
    category: "Experience",
    tags: ["Prenotazioni", "Pagamento in app", "Horror"],
    image: "/images/projects/CAGEcopertina.png",
    liveUrl: "https://cage.example.com",
    previewVideo: {
      desktop: "/videos/card/card_CAGE-desktop-f.mp4",
      mobile: "/videos/card/card_CAGE-desktop-f.mp4",
    },
    detailVideo: {
      desktop: "/videos/hq/hq_CAGE-desktop-f.mp4",
      mobile: "/videos/hq/hq_CAGE-mobile-f.mp4",
      mobilePoster: "/images/projects/CAGEmobile-poster.jpg",
    },
    featured: true,
    problem:
      "Le escape room spesso dipendono da canali esterni o da processi manuali per slot, prezzi e pagamenti.",
    solution:
      "Ho unito i seguenti punti in un unico posto, in modo da ottimizzare la velocità di prenotazione e la facilità di gestione dell'attivita.",
    architecture: [
      "Calendario con hold slot e prezzi dinamici",
      "Pagamenti Stripe (acconto/saldo)",
      "Pagina admin per gestione stanze, orari, prenotazioni e recensioni",
      "UI e UX adattata perfettamente al tema dark/horror",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma"],
    metrics: [
      {
        id: "lcp",
        label: "Largest Contentful Paint",
        before: "4.2s",
        after: "1.2s",
        improvement: "-71%",
      },
      {
        id: "engagement",
        label: "Tempo medio sessione",
        before: "50s",
        after: "2m 15s",
        improvement: "+170%",
      },
      {
        id: "bounce",
        label: "Bounce rate mobile",
        before: "64%",
        after: "31%",
        improvement: "-52%",
      },
      {
        id: "cls",
        label: "Cumulative Layout Shift",
        before: "0.22",
        after: "0.03",
        improvement: "-86%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 900, conversions: 12, loadTime: 4.2 },
      { month: "Feb", visitors: 1100, conversions: 18, loadTime: 3.1 },
      { month: "Mar", visitors: 1400, conversions: 28, loadTime: 2.2 },
      { month: "Apr", visitors: 1700, conversions: 36, loadTime: 1.6 },
      { month: "Mag", visitors: 2000, conversions: 48, loadTime: 1.3 },
      { month: "Giu", visitors: 2300, conversions: 58, loadTime: 1.2 },
    ],
    insights: {
      performanceScore: 96,
      vitals: [
        {
          id: "lcp",
          label: "LCP",
          value: "1.2s",
          rating: "good",
          description: "Largest Contentful Paint — soglia “buono” sotto 2.5s",
        },
        {
          id: "inp",
          label: "INP",
          value: "98ms",
          rating: "good",
          description: "Interaction to Next Paint — reattività sotto 200ms",
        },
        {
          id: "cls",
          label: "CLS",
          value: "0.03",
          rating: "good",
          description: "Cumulative Layout Shift — stabilità visiva sotto 0.1",
        },
      ],
      stats: [
        {
          id: "clients",
          label: "Clienti acquisiti",
          value: "48",
          delta: "+62%",
          deltaLabel: "vs semestre prec.",
        },
        {
          id: "visitors",
          label: "Visitatori unici",
          value: "12.4k",
          delta: "+156%",
          deltaLabel: "in 6 mesi",
        },
        {
          id: "conversion",
          label: "Tasso conversione",
          value: "3.8%",
          delta: "+1.9pt",
          deltaLabel: "dopo il redesign",
        },
        {
          id: "ttfb",
          label: "TTFB (Edge)",
          value: "42ms",
          delta: "−68%",
          deltaLabel: "con Vercel Edge",
        },
      ],
    },
  },
  {
    id: "2",
    slug: "scavo",
    title: "SCAVO - portfolio fotografico",
    excerpt:
      "Sito fotografico professionale (maternity, newborn, smash cake) con admin per gestire categorie e foto senza toccare il codice.",
    description:
      "Sito fotografico professionale (maternity, newborn, smash cake) con admin per gestire categorie e foto senza toccare il codice. Ottimizzazione automatica tramite sharp delle foto per rendere il sito veloce e performante.",
    category: "Brand",
    tags: ["Vetrina", "Portfolio fotografico", "HD"],
    image: "/images/projects/SCAVOcopertina.png",
    liveUrl: "https://scavo.example.com",
    previewVideo: {
      desktop: "/videos/card/card_SCAVO-desktop-f.mp4",
      mobile: "/videos/card/card_SCAVO-desktop-f.mp4",
    },
    detailVideo: {
      desktop: "/videos/hq/hq_SCAVO-desktop-f.mp4",
      mobile: "/videos/hq/hq_SCAVO-mobile-f.mp4",
      mobilePoster: "/images/projects/SCAVOmobile-poster.jpg",
    },
    featured: true,
    problem:
      "Nonostante siano di facile utilizzo, i social media diminuiscono la qualità delle foto, per cui non si riesce a vedere la qualità delle foto e di conseguenza della fotografa.",
    solution:
      "La fotografa può aggiornare portfolio, testi e copertine in autonomia, senza dipendere da uno sviluppatore o da un CMS generico poco adatto alle immagini ad alta risoluzione.",
    architecture: [
      "Pipeline upload HD → versione web ottimizzata (sharp + R2), lightbox che carica HD solo on-demand",
      "Categorie e contenuti dinamici dal DB, SEO curata (OG, JSON-LD, sitemap)",
      "Admin protetto (Better Auth, rate limit, CSP), storage monitorato su R2",
      "Stack moderno e performante: Next.js, Neon, Cloudflare R2",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Cloudflare R2"],
    metrics: [
      {
        id: "lcp",
        label: "LCP",
        before: "3.9s",
        after: "1.1s",
        improvement: "-72%",
      },
      {
        id: "engagement",
        label: "Tempo medio sessione",
        before: "42s",
        after: "2m 40s",
        improvement: "+281%",
      },
      {
        id: "pages",
        label: "Pagine per sessione",
        before: "1.9",
        after: "4.1",
        improvement: "+116%",
      },
      {
        id: "organic",
        label: "Traffico organico",
        before: "700/mo",
        after: "2100/mo",
        improvement: "+200%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 700, conversions: 8, loadTime: 3.9 },
      { month: "Feb", visitors: 950, conversions: 14, loadTime: 2.9 },
      { month: "Mar", visitors: 1200, conversions: 22, loadTime: 2.1 },
      { month: "Apr", visitors: 1500, conversions: 30, loadTime: 1.5 },
      { month: "Mag", visitors: 1800, conversions: 38, loadTime: 1.2 },
      { month: "Giu", visitors: 2100, conversions: 45, loadTime: 1.1 },
    ],
    insights: {
      performanceScore: 94,
      vitals: [
        {
          id: "lcp",
          label: "LCP",
          value: "1.1s",
          rating: "good",
          description: "Largest Contentful Paint — soglia “buono” sotto 2.5s",
        },
        {
          id: "inp",
          label: "INP",
          value: "112ms",
          rating: "good",
          description: "Interaction to Next Paint — reattività sotto 200ms",
        },
        {
          id: "cls",
          label: "CLS",
          value: "0.04",
          rating: "good",
          description: "Cumulative Layout Shift — stabilità visiva sotto 0.1",
        },
      ],
      stats: [
        {
          id: "clients",
          label: "Clienti acquisiti",
          value: "31",
          delta: "+48%",
          deltaLabel: "vs semestre prec.",
        },
        {
          id: "visitors",
          label: "Visitatori unici",
          value: "8.9k",
          delta: "+200%",
          deltaLabel: "traffico organico",
        },
        {
          id: "conversion",
          label: "Tasso conversione",
          value: "2.9%",
          delta: "+1.4pt",
          deltaLabel: "dopo il redesign",
        },
        {
          id: "ttfb",
          label: "TTFB (Edge)",
          value: "38ms",
          delta: "−71%",
          deltaLabel: "con Vercel Edge",
        },
      ],
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
