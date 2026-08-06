"use client";

import { Button } from "@/components/ui/Button";
import { TechIcon } from "@/components/ui/TechIcon";
import { useHeroLive } from "@/components/sections/hero/HeroGfx";
import { cn } from "@/lib/utils";

/** Polar placement: angle ° from top, radius as % of stage (50 ≈ edge). */
const ORBIT_ICONS = [
  { id: "typescript", angle: -52, radius: 44, size: 22, float: "hero-float-a" },
  { id: "nodejs", angle: -8, radius: 33, size: 24, float: "hero-float-b" },
  { id: "javascript", angle: -38, radius: 28, size: 20, float: "hero-float-c" },
  { id: "tailwind", angle: -118, radius: 34, size: 22, float: "hero-float-a" },
  { id: "vercel", angle: 48, radius: 42, size: 18, float: "hero-float-b" },
  { id: "nextjs", angle: 118, radius: 40, size: 20, float: "hero-float-c" },
  { id: "figma", angle: 148, radius: 28, size: 20, float: "hero-float-a" },
  { id: "react", angle: 180, radius: 46, size: 26, float: "hero-float-b" },
] as const;

const RINGS = [
  { size: "92%", opacity: 0.22, spin: "out" as const },
  { size: "68%", opacity: 0.18, spin: "rev" as const },
  { size: "46%", opacity: 0.14, spin: null },
] as const;

function OrbitNode({
  id,
  angle,
  radius,
  size,
  float,
  live,
}: {
  id: string;
  angle: number;
  radius: number;
  size: number;
  float: string;
  live: boolean;
}) {
  const rad = (angle * Math.PI) / 180;
  const left = 50 + Math.sin(rad) * radius;
  const top = 50 - Math.cos(rad) * radius;

  return (
    <div
      aria-hidden
      className="absolute z-10"
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2",
          "flex size-11 items-center justify-center rounded-full",
          "bg-foreground/[0.06] ring-1 ring-foreground/12 backdrop-blur-sm",
          "shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--foreground)_45%,transparent)]",
          "sm:size-12",
          live && float,
        )}
      >
        <TechIcon id={id} size={size} />
      </div>
    </div>
  );
}

function BrandOrbit({ live }: { live: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(78vw,340px)] sm:max-w-[400px] md:max-w-[440px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 68%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {RINGS.map((ring) => (
          <div
            key={ring.size}
            className={cn(
              "absolute aspect-square rounded-full border border-dashed",
              live && ring.spin === "out" && "hero-orbit-spin",
              live && ring.spin === "rev" && "hero-i-orbit-rev",
            )}
            style={{
              width: ring.size,
              borderColor: `color-mix(in srgb, var(--foreground) ${Math.round(ring.opacity * 100)}%, transparent)`,
              animationDuration: ring.spin === "out" ? "72s" : "96s",
            }}
          />
        ))}
      </div>

      {ORBIT_ICONS.map((item) => (
        <OrbitNode key={item.id} {...item} live={live} />
      ))}

      <h1
        className={cn(
          "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2",
          "select-none text-center font-semibold uppercase tracking-[0.06em]",
          "text-[clamp(2.5rem,11vw,4.5rem)] leading-none",
          "text-foreground/[0.2]",
        )}
      >
        Aiello
      </h1>
    </div>
  );
}

/**
 * I — Brand-first orbital: AIELLO al centro, stack tech in orbita, copy + CTA sotto.
 */
export function HeroVariantI() {
  const live = useHeroLive();

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10">
      <BrandOrbit live={live} />

      <p className="mx-auto mt-5 max-w-xl text-center text-[0.95rem] leading-7 text-foreground/70 sm:mt-7 sm:text-lg sm:leading-8">
        Design, sviluppo e performance in un unico flusso, per trasformare
        l&apos;attenzione dei tuoi clienti in crescita reale.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3.5 sm:mt-7">
        <Button
          href="/contact"
          className={cn(
            "shadow-[0_0_28px_-4px_color-mix(in_srgb,var(--accent)_55%,transparent)]",
            live && "hero-cta-glow",
          )}
        >
          Iniziamo un progetto
        </Button>
        <Button
          href="/#projects"
          variant="secondary"
          className="border-foreground/25 hover:border-foreground/40 hover:bg-foreground/[0.04]"
        >
          Vedi i progetti
        </Button>
      </div>
    </div>
  );
}
