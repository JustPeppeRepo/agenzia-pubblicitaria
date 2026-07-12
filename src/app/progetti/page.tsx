import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Progetti",
  description: "Portfolio dei lavori realizzati dall'agenzia.",
};

export default function ProgettiPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Tutti i progetti"
        description="Una selezione completa dei nostri lavori più recenti."
      />
      <div className="mt-12">
        <Projects variant="full" />
      </div>
    </div>
  );
}
