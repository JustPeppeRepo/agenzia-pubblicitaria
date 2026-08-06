import { CornerBloom } from "@/components/decor/CornerBloom";
import { HeroVariantH } from "@/components/sections/hero/variants/HeroVariantH";

/**
 * Hero — product mockup (H). Soft mesh background + corner blooms.
 * Alternate composition: `HeroVariantI` in the same folder.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background md:min-h-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-mesh"
      />
      {/* Soft blend under the sticky nav — avoids a hard clip line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-background via-background/50 to-transparent sm:h-20"
      />
      {/* Blooms sit high so the lower band stays a flat base color */}
      <CornerBloom
        tone="accent"
        position="top-right"
        className="-right-28 -top-10 opacity-80 sm:-right-36 sm:-top-12 sm:opacity-90"
      />
      <CornerBloom
        tone="spark"
        position="top-left"
        className="-left-24 -top-8 h-64 w-64 opacity-55 sm:-left-32 sm:-top-10 sm:h-72 sm:w-72 sm:opacity-65"
      />

      <div className="relative flex flex-1 flex-col justify-center pb-12 pt-4 sm:pb-14 md:pb-16">
        <HeroVariantH />
      </div>

      {/* Stesso tono della fascia scura dell'onda — niente distacco / orbite */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-background via-background/85 to-transparent sm:h-32 md:h-36"
      />
    </section>
  );
}
