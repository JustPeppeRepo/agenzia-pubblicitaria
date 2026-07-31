import type { Project } from "@/types";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CornerBloom } from "@/components/decor/CornerBloom";
import { SectionWave } from "@/components/decor/SectionWave";

type ProjectsGridProps = {
  projects: Project[];
  title?: string;
  description?: string;
  id?: string;
};

export function ProjectsGrid({
  projects,
  title = "Progetti selezionati",
  description = "Non fidarti di noi ma dei nostri risultati. Guarda i nostri progetti",
  id = "projects",
}: ProjectsGridProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <CornerBloom
        tone="accent-2"
        position="bottom-right"
        className="opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <SectionHeading eyebrow="Portfolio" title={title} description={description} />
        </FadeIn>

        <StaggerContainer className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="flex h-full min-h-0 flex-col">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <SectionWave className="relative" />
    </section>
  );
}
