"use client";

import { Button } from "@/components/ui/Button";
import { useHeroLive } from "@/components/sections/hero/HeroGfx";
import { cn } from "@/lib/utils";

/**
 * Tiny client island: primary hero CTA with CSS glow after mount.
 */
export function HeroPrimaryCta() {
  const live = useHeroLive();

  return (
    <Button
      href="/contact"
      className={cn(
        "shadow-[0_0_28px_-4px_color-mix(in_srgb,var(--accent)_55%,transparent)]",
        live && "hero-cta-glow",
      )}
    >
      Iniziamo un progetto
    </Button>
  );
}
