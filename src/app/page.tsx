import { getFeaturedProjects } from "@/lib/content";
import { TeamScrollBridge } from "@/components/sections/TeamScrollBridge";
import { Hero } from "@/components/sections/Hero";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";

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
