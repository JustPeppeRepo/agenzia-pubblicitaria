"use client";

import { useEffect, useState } from "react";
import {
  applyPalette,
  getStoredPalette,
  isPaletteId,
  PALETTES,
  type PaletteId,
} from "@/lib/palette";

function readDomPalette(): PaletteId {
  if (typeof document === "undefined") return "brand-echo";
  const current = document.documentElement.dataset.palette;
  return isPaletteId(current) ? current : "brand-echo";
}

/** Floating preview control — cycles the 4 brand palettes without touching layout. */
export function PaletteSwitcher() {
  const [palette, setPalette] = useState<PaletteId>("brand-echo");

  useEffect(() => {
    const current = document.documentElement.dataset.palette
      ? readDomPalette()
      : getStoredPalette();
    applyPalette(current);
    setPalette(current);
  }, []);

  function select(id: PaletteId) {
    applyPalette(id);
    setPalette(id);
  }

  const active = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-[min(100vw-2rem,16rem)] rounded-2xl border border-foreground/15 bg-background/90 p-3 shadow-lg shadow-foreground/10 backdrop-blur-md">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/50">
        Palette preview
      </p>
      <p className="mb-3 text-sm font-medium text-foreground">{active.label}</p>
      <div className="flex flex-col gap-1.5">
        {PALETTES.map((p) => {
          const selected = p.id === palette;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id)}
              aria-pressed={selected}
              className={
                selected
                  ? "flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-2.5 py-2 text-left text-xs font-medium text-foreground transition-colors"
                  : "flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-2 text-left text-xs text-foreground/65 transition-colors hover:border-foreground/10 hover:bg-foreground/5 hover:text-foreground"
              }
            >
              <span className="flex gap-1" aria-hidden>
                {p.swatches.map((c) => (
                  <span
                    key={c}
                    className="size-3 rounded-full ring-1 ring-foreground/15"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
