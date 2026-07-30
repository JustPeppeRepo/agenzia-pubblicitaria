import { CompetitiveComparison } from "@/components/sections/CompetitiveComparison";
import { PlainTalk } from "@/components/sections/PlainTalk";

export function ValueProposition() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
      />

      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-6">
        <CompetitiveComparison />
      </div>
      <PlainTalk />
    </section>
  );
}
