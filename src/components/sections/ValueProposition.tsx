import { valuePropositions } from "@/data/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValueProposition() {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Perché scegliere me"
            title="Risultati concreti, zero promesse vuote"
            description="Non vendo 'siti bellissimi'. Vendo prodotti digitali misurabili, veloci e pronti per la produzione."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
          {valuePropositions.map((item) => (
            <StaggerItem key={item.id}>
              <article className="group h-full rounded-2xl border border-foreground/10 bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden>
                    {item.icon}
                  </span>
                  {item.metric ? (
                    <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/70">
                      {item.metric}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
