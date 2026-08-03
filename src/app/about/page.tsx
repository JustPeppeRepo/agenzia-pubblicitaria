import type { Metadata } from "next";
import { aboutMembers, aboutPage, DOUBLE } from "@/data/site";
import { marketingTechnologies, technologies } from "@/data/technologies";
import { AboutMemberSection } from "@/components/sections/AboutMemberSection";
import { CursorAiHighlight } from "@/components/sections/CursorAiHighlight";
import { MarketingApproach } from "@/components/sections/MarketingApproach";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { WebArchitectureDiagram } from "@/components/sections/WebArchitectureDiagram";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: DOUBLE ? "Chi siamo" : "Chi sono",
  description: aboutPage.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: DOUBLE
      ? "Chi siamo | Aiello Digital Studio"
      : "Chi sono | Aiello Digital Studio",
    description: aboutPage.ogDescription,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <SectionHeading eyebrow={aboutPage.eyebrow} />
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
