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
    image: "/images/projects/CAGEcopertina.webp",
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
    image: "/images/projects/SCAVOcopertina.webp",
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
