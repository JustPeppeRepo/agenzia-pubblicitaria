import { aboutMembers, siteConfig } from "@/data/site";

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
export const defaultOgImagePath = "/images/projects/CAGEcopertina.webp";

/** Stable brand mark for Schema.org `logo` (square PNG). */
const brandLogoPath = "/icon-192.png";

const businessServices = [
  {
    name: "Sviluppo siti web",
    description:
      "Progettazione e sviluppo di siti e applicazioni web su misura, veloci e scalabili.",
  },
  {
    name: "SEO",
    description:
      "Ottimizzazione tecnica e contenutistica per posizionare il sito sui motori di ricerca.",
  },
  {
    name: "Pubblicità online",
    description:
      "Campagne ads mirate per intercettare clienti già in cerca dei tuoi servizi.",
  },
  {
    name: "Web design",
    description:
      "Design su misura, responsive e orientato alla conversione.",
  },
] as const;

/**
 * Local ProfessionalService — address, logo, contacts, and offers for Googlebot.
 * Emitted site-wide from the root layout.
 */
export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  const orgId = absoluteUrl("/#organization");
  const logoUrl = absoluteUrl(brandLogoPath);

  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": orgId,
    name: siteConfig.name,
    alternateName: "Aiello Studio",
    url: siteUrl,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: [absoluteUrl(defaultOgImagePath), logoUrl],
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 192,
      height: 192,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palermo",
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Palermo",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sicilia",
      },
      {
        "@type": "Country",
        name: "Italia",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: "IT",
        availableLanguage: ["Italian", "it"],
        url: absoluteUrl("/contact"),
      },
    ],
    knowsAbout: businessServices.map((s) => s.name),
    serviceType: businessServices.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi digitali",
      itemListElement: businessServices.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": orgId },
          areaServed: {
            "@type": "City",
            name: "Palermo",
          },
        },
      })),
    },
    sameAs: siteConfig.social.map((s) => s.href),
    priceRange: "$$",
  };
}

export function websiteJsonLd() {
  const orgId = absoluteUrl("/#organization");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    inLanguage: "it-IT",
    publisher: { "@id": orgId },
  };
}

/** Person identity for the developer/creative behind the studio (homepage + about). */
export function personJsonLd() {
  const { firstName, lastName } = siteConfig.privacyController;
  const fullName = `${firstName} ${lastName}`.trim();
  const engineer = aboutMembers.engineer;
  const orgId = absoluteUrl("/#organization");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    givenName: firstName,
    familyName: lastName,
    jobTitle: engineer.role,
    description: siteConfig.description,
    url: getSiteUrl(),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: absoluteUrl(engineer.image),
    sameAs: siteConfig.social.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palermo",
      addressRegion: "Sicilia",
      addressCountry: "IT",
    },
    worksFor: { "@id": orgId },
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
    creator: { "@id": absoluteUrl("/#organization") },
  };
}
