import type { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/content";
import { TeamScrollBridge } from "@/components/sections/TeamScrollBridge";
import { Hero } from "@/components/sections/Hero";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Siti web e pubblicità a Palermo`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

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
