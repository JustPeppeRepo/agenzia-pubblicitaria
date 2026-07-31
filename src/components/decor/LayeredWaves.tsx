import { cn } from "@/lib/utils";

type WaveTone = "ink" | "warm" | "background";

type LayeredWavesProps = {
  placement: "top" | "bottom";
  from: WaveTone;
  to: WaveTone;
  className?: string;
};

/**
 * Color stack: [0] brand (main silhouette) → [1] mid → [2] outer edge
 */
function layerFills(from: WaveTone, to: WaveTone): [string, string, string] {
  const brand = "color-mix(in srgb, var(--accent) 38%, var(--background))";
  const brandMid = "color-mix(in srgb, var(--accent-2) 42%, var(--background))";

  if (to === "warm") {
    return [brand, brandMid, "var(--background)"];
  }

  if (from === "background" && to === "ink") {
    return [
      "var(--wave-ink)",
      "color-mix(in srgb, var(--wave-ink) 55%, var(--background))",
      "color-mix(in srgb, var(--wave-ink) 18%, var(--background))",
    ];
  }

  return [
    "color-mix(in srgb, var(--warm) 85%, var(--wave-ink))",
    "color-mix(in srgb, var(--spark) 50%, var(--wave-ink))",
    from === "ink" ? "var(--wave-ink)" : "var(--background)",
  ];
}

/** Shared silhouette — same size, shape, and effect for top and bottom. */
const WAVE_PATHS = [
  "M0,130 H1440 V22 C1320,2 1140,42 960,18 C780,-4 600,-8 420,20 C240,48 120,34 0,26 Z",
  "M0,130 H1440 V58 C1200,80 1020,34 840,60 C660,84 480,90 300,62 C140,38 60,50 0,56 Z",
  "M0,130 H1440 V94 C1260,72 1080,114 900,90 C720,68 540,62 360,92 C180,118 80,106 0,96 Z",
] as const;

/** Multi-layer wave divider — closed bands (preferred look). */
export function LayeredWaves({
  placement,
  from,
  to,
  className,
}: LayeredWavesProps) {
  const fills = layerFills(from, to);

  return (
    <div
      aria-hidden
      data-placement={placement}
      className={cn(
        "pointer-events-none relative z-1 w-full leading-0",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        className={cn(
          "block h-28 w-full sm:h-32 md:h-36",
          placement === "top" && "rotate-180",
        )}
      >
        {WAVE_PATHS.map((d, i) => (
          <path key={i} d={d} fill={fills[i]} />
        ))}
      </svg>
    </div>
  );
}
