import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "cage",
    title: "CAGE",
    excerpt:
      "Sito immersivo con anteprima video desktop e mobile per un’esperienza di brand ad alto impatto.",
    description:
      "Landing e vetrina digitale ottimizzate per performance, con preview video responsive e navigazione fluida.",
    category: "Experience",
    tags: ["Next.js", "Video", "Motion"],
    image: "/images/projects/cage-cover.jpg",
    previewVideo: {
      desktop: "/videos/card/CAGE-desktop-card.mp4",
      mobile: "/videos/card/CAGE-desktop-card.mp4",
    },
    detailVideo: {
      desktop: "/videos/optimized/CAGE-desktop-fullscreen.mp4",
      mobile: "/videos/optimized/CAGE-mobile-fullscreen.mp4",
    },
    featured: true,
    problem:
      "Il brand aveva bisogno di un sito che mostrasse il prodotto in movimento, senza rallentare il caricamento su mobile e desktop.",
    solution:
      "Anteprime video leggere sulle card e clip fullscreen a qualità superiore nella pagina progetto, con sorgenti dedicate per viewport desktop e mobile.",
    architecture: [
      "Video card leggeri (preload none, play on hover)",
      "Video detail a qualità superiore sulla pagina slug",
      "Sorgenti separate desktop / mobile",
      "Static generation per ogni case study",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
  },
  {
    id: "2",
    slug: "scavo",
    title: "SCAVO",
    excerpt:
      "Case study con preview video sulle card e visualizzazione fullscreen ad alta qualità nella pagina progetto.",
    description:
      "Esperienza digitale con focus su storytelling visivo, performance e anteprime video responsive.",
    category: "Brand",
    tags: ["Next.js", "Video", "SEO"],
    image: "/images/projects/scavo-cover-v2.jpg",
    previewVideo: {
      desktop: "/videos/card/scavo-desktop-card.mp4",
      mobile: "/videos/card/scavo-desktop-card.mp4",
    },
    detailVideo: {
      desktop: "/videos/optimized/SCAVO-desktop-fullscreen.mp4",
      mobile: "/videos/optimized/SCAVO-mobile-fullscreen.mp4",
    },
    featured: true,
    problem:
      "Serviva un portfolio case study che comunicasse qualità visiva senza compromettere velocità e usabilità su smartphone.",
    solution:
      "Pipeline video a due livelli: clip card ottimizzate per hover e versioni fullscreen a qualità superiore nella pagina slug, con varianti desktop e mobile.",
    architecture: [
      "Card preview con MP4 leggeri e loop muted",
      "Hero video fullscreen sulla pagina dettaglio",
      "Switch automatico desktop / mobile via matchMedia",
      "Immagine poster come fallback e LCP",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
