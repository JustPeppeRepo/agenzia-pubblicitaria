import { getFeaturedProjects } from "@/lib/content";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ValueProposition } from "@/components/sections/ValueProposition";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <AboutBrief />
      <ValueProposition />
      <ProjectsGrid projects={featuredProjects} />
      <ContactCTA />
    </>
  );
}
