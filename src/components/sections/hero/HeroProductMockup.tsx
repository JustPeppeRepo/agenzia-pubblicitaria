"use client";

import { useRef } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { useHeroLive } from "@/components/sections/hero/HeroGfx";
import { cn } from "@/lib/utils";

const BARS = [38, 62, 48, 78, 55, 92, 70, 100] as const;

/**
 * Three orbits around the mockup — always larger than the card so rings
 * never kiss its border at any breakpoint (tilt + logo chip radius included).
 * SVG ellipse + matching offset-path keep logos locked to the ring.
 */
const ORBIT_TRACKS = [
  {
    id: "react",
    size: 15,
    tilt: -14,
    /** Wide outer ring — clears card + ~logo half-size */
    width: "w-[148%]",
    aspect: "aspect-[1.48/1]",
    offset: "translate-x-[2%] -translate-y-[2%]",
    rx: 49.2,
    ry: 49.2,
    dashed: true,
    strokeOpacity: 0.2,
    duration: "16s",
    delay: "-3s",
    reverse: false,
  },
  {
    id: "nextjs",
    size: 14,
    /** More oblique so the tall ring clears the lower wave on wide viewports */
    tilt: 72,
    width: "w-[136%]",
    aspect: "aspect-[0.82/1]",
    offset: "-translate-x-[3%] translate-y-[1%]",
    rx: 49.2,
    ry: 49.2,
    dashed: true,
    strokeOpacity: 0.15,
    duration: "22s",
    delay: "-11s",
    reverse: true,
  },
  {
    id: "typescript",
    size: 13,
    tilt: -32,
    width: "w-[142%]",
    aspect: "aspect-[1.18/1]",
    offset: "translate-x-[2%] translate-y-[4%]",
    rx: 49.2,
    ry: 49.2,
    dashed: false,
    strokeOpacity: 0.12,
    duration: "18s",
    delay: "-7s",
    reverse: false,
  },
] as const;

function OrbitTrack({
  id,
  size,
  tilt,
  width,
  aspect,
  offset,
  rx,
  ry,
  dashed,
  strokeOpacity,
  duration,
  delay,
  reverse,
  live,
}: {
  id: string;
  size: number;
  tilt: number;
  width: string;
  aspect: string;
  offset: string;
  rx: number;
  ry: number;
  dashed: boolean;
  strokeOpacity: number;
  duration: string;
  delay: string;
  reverse: boolean;
  live: boolean;
}) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", offset)}>
      <div
        className={cn("relative", width, aspect)}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible text-foreground"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <ellipse
            cx="50"
            cy="50"
            rx={rx}
            ry={ry}
            fill="none"
            stroke="currentColor"
            strokeOpacity={strokeOpacity}
            strokeWidth={1.15}
            strokeDasharray={dashed ? "2.4 2.8" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className={cn(
            "absolute flex size-8 items-center justify-center rounded-full sm:size-9",
            "bg-background/70 ring-1 ring-foreground/12 backdrop-blur-[2px]",
            "shadow-[0_6px_16px_-10px_color-mix(in_srgb,var(--foreground)_35%,transparent)]",
            live && "hero-h-orbit-travel",
          )}
          style={{
            offsetPath: `ellipse(${rx}% ${ry}% at 50% 50%)`,
            offsetDistance: "0%",
            offsetRotate: "0deg",
            offsetAnchor: "center",
            animationDuration: duration,
            animationDelay: delay,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{ transform: `rotate(${-tilt}deg)` }}
          >
            <TechIcon id={id} size={size} className="opacity-70" />
          </span>
        </div>
      </div>
    </div>
  );
}

function StackOrbits({ live }: { live: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
    >
      {ORBIT_TRACKS.map((track) => (
        <OrbitTrack key={track.id} {...track} live={live} />
      ))}
    </div>
  );
}

function FloatChip({
  label,
  sub,
  tone,
  className,
  live,
  float,
}: {
  label: string;
  sub: string;
  tone: "accent" | "accent-2";
  className?: string;
  live: boolean;
  float: string;
}) {
  const tones = {
    accent: {
      border: "border-accent/30",
      glow: "shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--accent)_40%,transparent)]",
      dot: "bg-accent",
      label: "text-accent",
    },
    "accent-2": {
      border: "border-accent-2/30",
      glow: "shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--accent-2)_40%,transparent)]",
      dot: "bg-accent-2",
      label: "text-accent-2",
    },
  } as const;
  const t = tones[tone];

  return (
    <div
      className={cn(
        "absolute z-30 rounded-2xl border bg-background/75 px-3.5 py-2.5 shadow-lg backdrop-blur-md",
        t.border,
        t.glow,
        live && float,
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
          t.label,
        )}
      >
        <span className={cn("size-1.5 rounded-full", t.dot)} />
        {label}
      </p>
      <p className="mt-0.5 text-[13px] font-medium leading-tight text-foreground/85">{sub}</p>
    </div>
  );
}

/**
 * Desktop product mockup — client island. Soft bloom uses layered radials
 * (no live filter:blur) for the same glow at lower paint cost. CSS loops
 * pause when off-screen or tab hidden.
 */
export function HeroProductMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const live = useHeroLive(rootRef);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[440px] md:max-w-none">
      <StackOrbits live={live} />

      {/* Soft bloom — stacked radials with soft stops (replaces filter:blur(36px)) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[40%] z-0 opacity-90"
        style={{
          background: [
            "radial-gradient(ellipse 72% 58% at 60% 32%, color-mix(in oklab, var(--accent) 42%, transparent) 0%, color-mix(in oklab, var(--accent) 18%, transparent) 28%, color-mix(in oklab, var(--accent) 6%, transparent) 48%, transparent 72%)",
            "radial-gradient(ellipse 52% 46% at 36% 64%, color-mix(in oklab, var(--accent-2) 26%, transparent) 0%, color-mix(in oklab, var(--accent-2) 10%, transparent) 36%, transparent 68%)",
            "radial-gradient(ellipse 90% 75% at 50% 48%, color-mix(in oklab, var(--accent) 10%, transparent) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <FloatChip
        label="ADS"
        sub="Click qualificati"
        tone="accent-2"
        className="-right-2 top-[4%] sm:-right-5 sm:top-[2%]"
        live={live}
        float="hero-float-b"
      />
      <FloatChip
        label="SEO"
        sub="In 1ª pagina"
        tone="accent"
        className="-left-2 bottom-[12%] sm:-left-6 sm:bottom-[14%]"
        live={live}
        float="hero-float-a"
      />

      <div className={cn("hero-h-stage relative z-20", live && "hero-float-c")}>
        <div className="hero-h-tilt">
          <div className="overflow-hidden rounded-[1.35rem] border border-foreground/12 bg-background shadow-[0_32px_64px_-24px_color-mix(in_srgb,var(--foreground)_50%,transparent)] ring-1 ring-foreground/5">
            <div className="relative flex items-center gap-2 border-b border-foreground/8 bg-foreground/[0.035] px-3.5 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-spark/90" />
                <span className="size-2 rounded-full bg-[#3dd68c]" />
                <span className="size-2 rounded-full bg-accent-2/90" />
              </div>
              <div className="absolute left-1/2 flex w-[62%] max-w-[230px] -translate-x-1/2 items-center justify-center rounded-full bg-foreground/[0.07] px-3 py-1">
                <span className="truncate font-mono text-[10px] tracking-wide text-foreground/50">
                  yourbrand.it / projects
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-2">
                Digital product / 2026
              </p>
              <p className="mt-2.5 max-w-[15ch] text-[1.4rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[1.6rem]">
                Idee chiare. Esperienze{" "}
                <span className="text-accent">veloci.</span>
              </p>

              <div className="mt-5 flex items-end gap-3">
                <div className="flex h-[4.25rem] flex-1 items-end gap-1 rounded-xl bg-foreground/[0.04] px-2.5 py-2 ring-1 ring-foreground/7 sm:h-[4.75rem]">
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex-1 rounded-[3px] bg-gradient-to-t from-accent/30 to-accent",
                        live && "hero-bar-rise",
                      )}
                      style={{
                        height: `${h}%`,
                        animationDelay: live ? `${0.35 + i * 0.04}s` : undefined,
                      }}
                    />
                  ))}
                </div>

                <div className="flex h-[4.25rem] w-[4.35rem] shrink-0 flex-col justify-center rounded-xl bg-foreground/[0.045] px-2.5 ring-1 ring-foreground/8 sm:h-[4.75rem] sm:w-[4.85rem]">
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-spark">
                    speed
                  </span>
                  <span className="text-2xl font-semibold leading-none tracking-tight text-foreground sm:text-[1.7rem]">
                    98
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] tracking-[0.08em] text-foreground/40">
                  react / ui
                </p>

                <div className="relative -m-3 p-3">
                  {live && (
                    <>
                      <span className="hero-h-ripple pointer-events-none absolute inset-3 rounded-full" />
                      <span className="hero-h-ripple hero-h-ripple-delay pointer-events-none absolute inset-3 rounded-full" />
                    </>
                  )}
                  <span
                    className={cn(
                      "relative inline-flex items-center rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-semibold text-accent-foreground shadow-md shadow-accent/40",
                      live && "hero-cta-glow",
                    )}
                  >
                    live preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
