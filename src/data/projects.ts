import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "aurora-coffee",
    title: "Aurora Coffee",
    excerpt:
      "Rebranding digitale e e-commerce per una catena di specialty coffee milanese.",
    description:
      "Piattaforma e-commerce headless con animazioni scroll-driven e checkout ottimizzato per mobile.",
    category: "E-commerce",
    tags: ["Next.js", "Framer Motion", "Stripe"],
    image: "/images/projects/placeholder-1.svg",
    previewVideo: "/videos/aurora-preview.mp4",
    liveUrl: "https://example.com",
    featured: true,
    problem:
      "Aurora Coffee aveva un sito WordPress lento (LCP 4.8s) che perdeva il 60% degli utenti mobile prima del caricamento. Serviva un e-commerce veloce che raccontasse il brand artigianale.",
    solution:
      "Architettura Next.js SSG con product pages pre-renderizzate, immagini AVIF e checkout Stripe embedded. Animazioni Framer Motion per storytelling del processo di torrefazione.",
    architecture: [
      "Next.js App Router con SSG per catalogo prodotti",
      "Stripe Checkout per pagamenti PCI-compliant",
      "CMS headless simulato via file TS locali",
      "CDN edge caching per asset statici",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe"],
    metrics: [
      {
        id: "lcp",
        label: "Largest Contentful Paint",
        before: "4.8s",
        after: "1.1s",
        improvement: "-77%",
      },
      {
        id: "fcp",
        label: "First Contentful Paint",
        before: "2.9s",
        after: "0.8s",
        improvement: "-72%",
      },
      {
        id: "conversion",
        label: "Tasso conversione",
        before: "1.2%",
        after: "3.8%",
        improvement: "+217%",
      },
      {
        id: "bounce",
        label: "Bounce rate mobile",
        before: "68%",
        after: "32%",
        improvement: "-53%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 1200, conversions: 14, loadTime: 4.8 },
      { month: "Feb", visitors: 1450, conversions: 22, loadTime: 3.2 },
      { month: "Mar", visitors: 1800, conversions: 38, loadTime: 2.1 },
      { month: "Apr", visitors: 2100, conversions: 52, loadTime: 1.4 },
      { month: "Mag", visitors: 2400, conversions: 68, loadTime: 1.2 },
      { month: "Giu", visitors: 2800, conversions: 89, loadTime: 1.1 },
    ],
  },
  {
    id: "2",
    slug: "nova-tech",
    title: "Nova Tech",
    excerpt:
      "Sito corporate B2B SaaS con lead generation e dashboard metriche pubblica.",
    description:
      "Landing page ad alta conversione con form multi-step e integrazione analytics.",
    category: "SaaS",
    tags: ["Next.js", "Recharts", "SEO"],
    image: "/images/projects/placeholder-2.svg",
    previewVideo: "/videos/nova-preview.mp4",
    liveUrl: "https://example.com",
    featured: true,
    problem:
      "Nova Tech, startup B2B, non compariva su Google per keyword strategiche e il sito statico non generava lead qualificati. Budget marketing sprecato in traffico non convertito.",
    solution:
      "SSG con metadata dinamici per ogni sezione, blog MDX simulato via data layer, form lead con validazione real-time e A/B test su CTA principale.",
    architecture: [
      "generateMetadata per SEO per-page",
      "JSON-LD structured data per Organization",
      "Form validation client-side + API Route simulata",
      "Lazy loading sezioni below-the-fold",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    metrics: [
      {
        id: "seo",
        label: "SEO Score Lighthouse",
        before: "62",
        after: "100",
        improvement: "+61%",
      },
      {
        id: "leads",
        label: "Lead mensili",
        before: "12",
        after: "47",
        improvement: "+292%",
      },
      {
        id: "lcp",
        label: "LCP",
        before: "3.5s",
        after: "1.3s",
        improvement: "-63%",
      },
      {
        id: "organic",
        label: "Traffico organico",
        before: "800/mo",
        after: "3200/mo",
        improvement: "+300%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 800, conversions: 12, loadTime: 3.5 },
      { month: "Feb", visitors: 1100, conversions: 18, loadTime: 2.8 },
      { month: "Mar", visitors: 1600, conversions: 25, loadTime: 2.0 },
      { month: "Apr", visitors: 2200, conversions: 34, loadTime: 1.5 },
      { month: "Mag", visitors: 2800, conversions: 41, loadTime: 1.3 },
      { month: "Giu", visitors: 3200, conversions: 47, loadTime: 1.3 },
    ],
  },
  {
    id: "3",
    slug: "verde-vita",
    title: "Verde Vita",
    excerpt:
      "Brand identity e sito vetrina per prodotti biologici con focus su storytelling visivo.",
    description:
      "Portfolio brand con galleria immagini ottimizzata e animazioni parallax leggere.",
    category: "Brand",
    tags: ["Next.js", "GSAP-like", "Photography"],
    image: "/images/projects/placeholder-3.svg",
    previewVideo: "/videos/verde-preview.mp4",
    featured: true,
    problem:
      "Verde Vita vendeva prodotti premium ma il sito non comunicava qualità. Immagini non ottimizzate (15MB totali) e zero narrativa visiva del processo produttivo.",
    solution:
      "Galleria con next/image AVIF, lazy loading progressivo e sezioni scroll-animated che raccontano la filiera biologica. Zero database — tutti i prodotti in file TS.",
    architecture: [
      "Image pipeline AVIF/WebP automatica",
      "Componenti Server per galleria statica",
      "Framer Motion scroll-triggered reveals",
      "Data layer TS per catalogo prodotti",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      {
        id: "images",
        label: "Peso totale immagini",
        before: "15 MB",
        after: "890 KB",
        improvement: "-94%",
      },
      {
        id: "engagement",
        label: "Tempo medio sessione",
        before: "45s",
        after: "2m 40s",
        improvement: "+256%",
      },
      {
        id: "lcp",
        label: "LCP",
        before: "5.2s",
        after: "1.0s",
        improvement: "-81%",
      },
      {
        id: "pages",
        label: "Pagine per sessione",
        before: "1.8",
        after: "4.2",
        improvement: "+133%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 600, conversions: 8, loadTime: 5.2 },
      { month: "Feb", visitors: 750, conversions: 14, loadTime: 3.8 },
      { month: "Mar", visitors: 950, conversions: 22, loadTime: 2.4 },
      { month: "Apr", visitors: 1100, conversions: 28, loadTime: 1.6 },
      { month: "Mag", visitors: 1300, conversions: 35, loadTime: 1.1 },
      { month: "Giu", visitors: 1500, conversions: 42, loadTime: 1.0 },
    ],
  },
  {
    id: "4",
    slug: "linea-moda",
    title: "Linea Moda",
    excerpt:
      "Lookbook digitale interattivo per fashion label emergente.",
    description:
      "Esperienza immersiva con hover video preview e transizioni page-level.",
    category: "Fashion",
    tags: ["Next.js", "Video", "Motion"],
    image: "/images/projects/placeholder-4.svg",
    previewVideo: "/videos/linea-preview.mp4",
    featured: false,
    problem:
      "Linea Moda lanciava la prima collezione senza budget per shooting video costosi. Serviva un lookbook digitale che trasmettesse movimento e lusso accessibile.",
    solution:
      "Griglia lookbook con hover-to-video (MP4 loop leggeri), transizioni page con Framer Motion e typography editoriale. Tutto SSG, zero backend.",
    architecture: [
      "Video preload none — caricati solo on-hover",
      "Page transitions con AnimatePresence",
      "Font editoriali via next/font",
      "Static generation per ogni look",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      {
        id: "lcp",
        label: "LCP",
        before: "3.8s",
        after: "1.2s",
        improvement: "-68%",
      },
      {
        id: "shares",
        label: "Condivisioni social",
        before: "45/mo",
        after: "210/mo",
        improvement: "+367%",
      },
      {
        id: "newsletter",
        label: "Iscrizioni newsletter",
        before: "80/mo",
        after: "340/mo",
        improvement: "+325%",
      },
      {
        id: "cls",
        label: "Cumulative Layout Shift",
        before: "0.25",
        after: "0.02",
        improvement: "-92%",
      },
    ],
    chartData: [
      { month: "Gen", visitors: 400, conversions: 5, loadTime: 3.8 },
      { month: "Feb", visitors: 550, conversions: 12, loadTime: 2.9 },
      { month: "Mar", visitors: 700, conversions: 18, loadTime: 2.1 },
      { month: "Apr", visitors: 900, conversions: 25, loadTime: 1.5 },
      { month: "Mag", visitors: 1050, conversions: 30, loadTime: 1.2 },
      { month: "Giu", visitors: 1200, conversions: 38, loadTime: 1.2 },
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
