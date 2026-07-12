import type { Project } from "@/types";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProjectsGridProps = {
  projects: Project[];
  title?: string;
  description?: string;
  id?: string;
};

export function ProjectsGrid({
  projects,
  title = "Progetti selezionati",
  description = "Passa il mouse sulle card per vedere l'anteprima video del sito in azione.",
  id = "projects",
}: ProjectsGridProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <SectionHeading eyebrow="Portfolio" title={title} description={description} />
      </FadeIn>

      <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} priority={index < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
