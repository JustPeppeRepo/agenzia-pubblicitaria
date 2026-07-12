import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-foreground/50">
            Agenzia creativa
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button href="/progetti">Vedi i progetti</Button>
          <Button href="/contatti" variant="secondary">
            Richiedi un preventivo
          </Button>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
      />
    </section>
  );
}
