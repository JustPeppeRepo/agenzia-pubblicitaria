/**
 * @file Home `/`
 * @description Landing: hero, about breve, value prop, progetti, CTA.
 *
 * Components: Hero, AboutBrief, ValueProposition, ProjectsGrid, ContactCTA, JsonLd
 * Data/API: getFeaturedProjects(), personJsonLd(), siteConfig, absoluteUrl()
 * Hooks: (nessuno — Server Component)
 */
import type { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { absoluteUrl, defaultOgImagePath, personJsonLd } from "@/lib/seo";

const homeTitle = `${siteConfig.name} | Siti web e pubblicità a Palermo`;
const ogImage = absoluteUrl(defaultOgImagePath);

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: siteConfig.description,
  keywords: [
    "agenzia web Palermo",
    "sviluppo siti web",
    "Next.js",
    "SEO",
    "pubblicità online",
    "web design Palermo",
    "Giuseppe Aiello",
    siteConfig.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: ogImage,
        width: 1920,
        height: 1080,
        alt: `${siteConfig.name} — portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: [ogImage],
  },
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <AboutBrief />
      <ValueProposition />
      <ProjectsGrid projects={featuredProjects} />
      <ContactCTA />
    </>
  );
}
