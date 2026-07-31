import { siteConfig } from "@/data/site";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? siteConfig.url
  );
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default share image (absolute). Prefer a photographic asset over SVG logos. */
export const defaultOgImagePath = "/images/projects/CAGEcopertina.png";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: getSiteUrl(),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    image: absoluteUrl(defaultOgImagePath),
    areaServed: {
      "@type": "City",
      name: "Palermo",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palermo",
      addressCountry: "IT",
    },
    sameAs: siteConfig.social.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    inLanguage: "it-IT",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function creativeWorkJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  image: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    keywords: project.tags.join(", "),
    inLanguage: "it-IT",
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}
