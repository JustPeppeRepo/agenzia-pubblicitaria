import { cn } from "@/lib/utils";

type WaveTone = "ink" | "warm" | "background";

type LayeredWavesProps = {
  placement: "top" | "bottom";
  from: WaveTone;
  to: WaveTone;
  className?: string;
};

/**
 * Explicit stops so each band reads as its own wave.
 * Outer uses page background when coming from the Hero, so no black bar.
 */
function layerFills(from: WaveTone, to: WaveTone): [string, string, string] {
  // Order: deepest (toward `to`) → mid → shallowest (toward `from`)
  if (from === "ink" && to === "warm") {
    return [
      "color-mix(in srgb, var(--accent) 38%, var(--background))",
      "color-mix(in srgb, var(--accent-2) 48%, var(--background))",
      "var(--wave-ink)",
    ];
  }
  if (from === "background" && to === "warm") {
    return [
      "color-mix(in srgb, var(--accent) 38%, var(--background))",
      "color-mix(in srgb, var(--accent-2) 42%, var(--background))",
      "var(--background)",
    ];
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

const TOP_PATHS = [
  "M0,0 H1440 V112 C1320,130 1140,92 960,116 C780,136 600,142 420,120 C240,104 120,118 0,124 Z",
  "M0,0 H1440 V72 C1200,50 1020,96 840,70 C660,46 480,40 300,68 C140,92 60,80 0,74 Z",
  "M0,0 H1440 V36 C1260,58 1080,16 900,40 C720,62 540,68 360,38 C180,12 80,24 0,34 Z",
] as const;

const BOTTOM_PATHS = [
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
  const paths = placement === "top" ? TOP_PATHS : BOTTOM_PATHS;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative z-1 w-full leading-0",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        className="block h-28 w-full sm:h-32 md:h-36"
      >
        {paths.map((d, i) => (
          <path key={i} d={d} fill={fills[i]} />
        ))}
      </svg>
    </div>
  );
}
