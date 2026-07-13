import { getFeaturedProjects } from "@/lib/content";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { TeamScrollBridge } from "@/components/sections/TeamScrollBridge";
import { ValueProposition } from "@/components/sections/ValueProposition";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <TeamScrollBridge>
        <Hero />
        <AboutBrief />
      </TeamScrollBridge>
      <ValueProposition />
      <ProjectsGrid projects={featuredProjects} />
      <ContactCTA />
    </>
  );
}
