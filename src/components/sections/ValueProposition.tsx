import Link from "next/link";
import { valuePropositions } from "@/data/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { ValuePropositionVisual } from "@/components/sections/ValuePropositionVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValueProposition() {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Perché sceglierci"
            title="Più clienti, partendo dal tuo sito"
            description="Non devi capire di tecnologia per ottenere risultati. Ogni scelta che facciamo — dalla velocità alla visibilità su Google — serve un solo obiettivo: portarti più contatti, più richieste e più vendite."
          />
          <Link
            href="/about#tecnologie"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Scopri che tecnologie uso →
          </Link>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
          {valuePropositions.map((item) => (
            <StaggerItem key={item.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 sm:flex-row">
                <div className="border-b border-foreground/10 bg-foreground/[0.03] p-5 sm:w-[44%] sm:border-b-0 sm:border-r">
                  <ValuePropositionVisual id={item.id} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {item.metric ? (
                    <span className="w-fit rounded-full border border-emerald-500/25 bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {item.metric}
                    </span>
                  ) : null}
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/65">
                    {item.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
