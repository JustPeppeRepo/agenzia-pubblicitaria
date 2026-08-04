import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { CornerBloom } from "@/components/decor/CornerBloom";
import { HeroVisualSlot } from "@/components/sections/HeroVisualSlot";

/**
 * Server-rendered hero: LCP text/CTAs are visible in the initial HTML
 * (no opacity:0 gate). Decorative rail loads client-side on md+.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] flex-col overflow-hidden md:min-h-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-mesh"
      />
      <CornerBloom tone="accent" position="top-right" />
      <CornerBloom
        tone="spark"
        position="top-left"
        className="h-64 w-64 opacity-70 sm:h-72 sm:w-72"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 py-16 md:flex-row md:items-center md:gap-10 md:pb-32 md:pt-16">
        <div className="flex flex-1 flex-col items-center gap-10 text-center md:items-start md:text-left">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-2">
              {siteConfig.role}
            </p>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {siteConfig.tagline}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/65 md:mx-0 md:text-xl">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button href="/contact">Iniziamo un progetto</Button>
            <Button href="/#projects" variant="secondary">
              Vedi i progetti
            </Button>
          </div>
        </div>

        <HeroVisualSlot />
      </div>
    </section>
  );
}
