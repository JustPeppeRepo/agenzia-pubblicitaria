/**
 * @file About `/about`
 * @description Profilo (solo / team via `DOUBLE`), stack e approccio tecnico.
 *
 * Components: SectionHeading, AboutMemberSection, WebArchitectureDiagram,
 *   TechStackGrid, CursorAiHighlight, MarketingApproach (se DOUBLE), FadeIn, JsonLd
 * Data/API: aboutMembers, aboutPage, aboutTeam, technologies, marketingTechnologies, personJsonLd()
 * Hooks: (nessuno — Server Component; figli client gestiscono expand/collapse)
 */
import type { Metadata } from "next";
import {
  aboutMembers,
  aboutPage,
  aboutTeam,
  DOUBLE,
  siteConfig,
} from "@/data/site";
import { marketingTechnologies, technologies } from "@/data/technologies";
import { AboutMemberSection } from "@/components/sections/AboutMemberSection";
import { CursorAiHighlight } from "@/components/sections/CursorAiHighlight";
import { MarketingApproach } from "@/components/sections/MarketingApproach";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { WebArchitectureDiagram } from "@/components/sections/WebArchitectureDiagram";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personJsonLd } from "@/lib/seo";

const aboutTitle = DOUBLE ? "Chi siamo" : "Chi sono";
const aboutOgTitle = `${aboutTitle} | ${siteConfig.name}`;

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutPage.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: aboutOgTitle,
    description: aboutPage.ogDescription,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: aboutOgTitle,
    description: aboutPage.ogDescription,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <JsonLd data={personJsonLd()} />
      <FadeIn>
        <SectionHeading
          as="h1"
          eyebrow={aboutPage.eyebrow}
          title={aboutTitle}
          description={aboutTeam.description}
        />
      </FadeIn>

      <div className="mt-6 space-y-20">
        <FadeIn delay={0.1}>
          <AboutMemberSection
            member={aboutMembers.engineer}
            className="border-t-0 pt-0"
          >
            <div className="space-y-20">
              <WebArchitectureDiagram />
              <TechStackGrid
                eyebrow="Stack tecnologico"
                title="Perché ho scelto queste tecnologie"
                description="Ogni tool risolve un problema reale. Ecco il mio stack e la logica dietro ogni scelta."
                preface={<CursorAiHighlight />}
                technologies={technologies}
              />
            </div>
          </AboutMemberSection>
        </FadeIn>

        {DOUBLE ? (
          <FadeIn delay={0.15}>
            <AboutMemberSection member={aboutMembers.advertiser}>
              <div className="space-y-20">
                <MarketingApproach />
                <TechStackGrid
                  eyebrow="Strumenti e competenze"
                  title="Il toolkit dietro SEO, Ads e CRO"
                  description="Stack operativo reale: tracking, audit tecnico, campagne Google/Meta e ottimizzazione delle conversioni — con tool avanzati solo quando il ROI lo giustifica."
                  technologies={marketingTechnologies}
                />
              </div>
            </AboutMemberSection>
          </FadeIn>
        ) : null}
      </div>
    </div>
  );
}
