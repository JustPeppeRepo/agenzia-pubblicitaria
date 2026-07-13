import type { Metadata } from "next";
import { aboutMembers, aboutPage } from "@/data/site";
import { marketingTechnologies, technologies } from "@/data/technologies";
import { AboutMemberSection } from "@/components/sections/AboutMemberSection";
import { CursorAiHighlight } from "@/components/sections/CursorAiHighlight";
import { MarketingApproach } from "@/components/sections/MarketingApproach";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { WebArchitectureDiagram } from "@/components/sections/WebArchitectureDiagram";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Il team dietro Marco Dev: software engineering e strategia pubblicitaria per la presenza digitale del tuo business.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <SectionHeading
          eyebrow={aboutPage.eyebrow}
          title={aboutPage.title}
          description={aboutPage.description}
        />
      </FadeIn>

      <div className="mt-20 space-y-20">
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

        <FadeIn delay={0.15}>
          <AboutMemberSection member={aboutMembers.advertiser}>
            <div className="space-y-20">
              <MarketingApproach />
              <TechStackGrid
                eyebrow="Strumenti e competenze"
                title="Perché usiamo questi canali"
                description="Ogni strumento copre una fase del percorso — dalla visibilità organica alla misurazione delle conversioni."
                technologies={marketingTechnologies}
              />
            </div>
          </AboutMemberSection>
        </FadeIn>
      </div>
    </div>
  );
}
