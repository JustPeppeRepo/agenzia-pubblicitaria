import { CompetitiveComparison } from "@/components/sections/CompetitiveComparison";
import { PlainTalk } from "@/components/sections/PlainTalk";

export function ValueProposition() {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.02] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <CompetitiveComparison />
      </div>
      <PlainTalk />
    </section>
  );
}
