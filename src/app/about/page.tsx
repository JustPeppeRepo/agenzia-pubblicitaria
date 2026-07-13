import type { Metadata } from "next";
import { aboutDetailed } from "@/data/site";
import { technologies } from "@/data/technologies";
import { WebArchitectureDiagram } from "@/components/sections/WebArchitectureDiagram";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcon";

export const metadata: Metadata = {
  title: "About",
  description:
    "Percorso, filosofia di sviluppo e stack tecnologico di Marco Dev.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <SectionHeading
          eyebrow="About"
          title="Ingegneria frontend con occhio creativo"
          description={aboutDetailed.intro}
        />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8 max-w-3xl">
        <p className="text-base leading-7 text-foreground/70">
          {aboutDetailed.philosophy}
        </p>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-12">
        <WebArchitectureDiagram />
      </FadeIn>

      {/* Tech stack deep dive */}
      <section id="tecnologie" className="mt-20 border-t border-foreground/10 pt-20 scroll-mt-24">
        <FadeIn>
          <SectionHeading
            eyebrow="Stack tecnologico"
            title="Perché ho scelto queste tecnologie"
            description="Ogni tool risolve un problema reale. Ecco il mio stack e la logica dietro ogni scelta."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
          {technologies.map((tech) => (
            <StaggerItem key={tech.id}>
              <article className="h-full rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-foreground/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                      <TechIcon id={tech.id} fallback={tech.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="font-semibold">{tech.name}</h3>
                      <p className="text-xs text-foreground/50">
                        {tech.shortDescription}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground/40">
                    {tech.proficiency}%
                  </span>
                </div>

                {/* Proficiency bar */}
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/5">
                  <div
                    className="h-full rounded-full bg-foreground/60 transition-all"
                    style={{ width: `${tech.proficiency}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-foreground/65">
                  {tech.whyChosen}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
