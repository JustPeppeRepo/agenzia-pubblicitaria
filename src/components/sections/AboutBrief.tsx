import { aboutBrief } from "@/data/site";
import { featuredTechnologies } from "@/data/technologies";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutBrief() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <SectionHeading
          eyebrow="Chi sono"
          title="Sviluppatore frontend, ossessionato dalle performance"
          description={aboutBrief}
        />
      </FadeIn>

      <FadeIn delay={0.15} className="mt-12">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
          Stack principale
        </p>
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {featuredTechnologies.map((tech) => (
            <StaggerItem key={tech.id}>
              <div className="group flex flex-col items-center rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 text-center transition-colors hover:border-foreground/25 hover:bg-foreground/[0.04]">
                <span
                  className="text-2xl transition-transform group-hover:scale-110"
                  aria-hidden
                >
                  {tech.icon}
                </span>
                <span className="mt-2 text-xs font-medium text-foreground/80">
                  {tech.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>
    </section>
  );
}
