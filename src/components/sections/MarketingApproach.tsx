import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

/**
 * Visual story of what Vito does — plain language + illustrations.
 * Keep jargon out of the main path; tools appear only as small badges.
 */

const STEPS = [
  {
    id: "find",
    title: "Ti cercano",
    body: "Qualcuno ha bisogno di te e apre Google o Instagram.",
    tools: [
      { id: "gsc", label: "Search" },
      { id: "ga4", label: "Analytics" },
    ] as const,
    tone: "accent" as const,
  },
  {
    id: "appear",
    title: "Ti faccio trovare",
    body: "Con SEO e annunci ti faccio comparire dove conta — senza sperare nella fortuna.",
    tools: [
      { id: "google-ads", label: "Google Ads" },
      { id: "meta-ads", label: "Meta" },
      { id: "screaming-frog", label: "SEO" },
    ] as const,
    tone: "spark" as const,
  },
  {
    id: "convince",
    title: "Li convinco",
    body: "Arrivano sul sito: messaggio chiaro, prova e un’azione da fare subito.",
    tools: [
      { id: "hotjar", label: "Hotjar" },
      { id: "hubspot", label: "CRO" },
    ] as const,
    tone: "accent-2" as const,
  },
  {
    id: "grow",
    title: "Faccio crescere",
    body: "Guardo i numeri, taglio ciò che non paga e aumento dove funziona.",
    tools: [
      { id: "ga4", label: "Dati" },
      { id: "ahrefs", label: "Keyword" },
    ] as const,
    tone: "accent" as const,
  },
] as const;

function toneClasses(tone: (typeof STEPS)[number]["tone"]) {
  switch (tone) {
    case "spark":
      return {
        ring: "border-spark/35 bg-spark/8",
        icon: "bg-spark/15 text-spark",
        number: "text-spark",
      };
    case "accent-2":
      return {
        ring: "border-accent-2/35 bg-accent-2/8",
        icon: "bg-accent-2/15 text-accent-2",
        number: "text-accent-2",
      };
    default:
      return {
        ring: "border-accent/35 bg-accent/8",
        icon: "bg-accent/15 text-accent",
        number: "text-accent",
      };
  }
}

/* -------------------------------------------------------------------------- */
/* Illustrations — simple scenes, not abstract jargon boxes                    */
/* -------------------------------------------------------------------------- */

function SearchIllustration() {
  return (
    <svg viewBox="0 0 120 88" className="mx-auto h-20 w-full max-w-34" aria-hidden>
      {/* Phone */}
      <rect
        x="38"
        y="6"
        width="44"
        height="76"
        rx="8"
        fill="color-mix(in srgb, var(--foreground) 6%, transparent)"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/30"
      />
      <rect x="52" y="12" width="16" height="3" rx="1.5" className="fill-foreground/20" />
      {/* Search bar */}
      <rect
        x="46"
        y="28"
        width="28"
        height="10"
        rx="5"
        fill="color-mix(in srgb, var(--accent) 18%, transparent)"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-accent/50"
      />
      <circle cx="52" cy="33" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
      <path d="M54 35l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-accent" />
      {/* Result lines */}
      <rect x="46" y="46" width="22" height="3" rx="1" className="fill-foreground/25" />
      <rect x="46" y="53" width="16" height="2.5" rx="1" className="fill-foreground/15" />
      <rect x="46" y="60" width="20" height="2.5" rx="1" className="fill-foreground/12" />
      {/* Cursor tap */}
      <circle cx="78" cy="52" r="6" className="fill-spark/40" />
      <circle cx="78" cy="52" r="2.5" className="fill-spark" />
    </svg>
  );
}

function AdsIllustration() {
  return (
    <svg viewBox="0 0 120 88" className="mx-auto h-20 w-full max-w-34" aria-hidden>
      {/* Megaphone body */}
      <path
        d="M28 40 L58 28 L58 60 L28 48 Z"
        fill="color-mix(in srgb, var(--spark) 22%, transparent)"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-spark/60"
      />
      <rect
        x="20"
        y="38"
        width="10"
        height="12"
        rx="2"
        fill="color-mix(in srgb, var(--spark) 35%, transparent)"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-spark/70"
      />
      <path d="M24 50v10c0 2 3 3 5 1l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-spark/50" />
      {/* Sound waves / reach */}
      <path d="M66 30c6 6 6 22 0 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent/45" />
      <path d="M74 24c10 10 10 30 0 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent/30" />
      <path d="M82 18c14 14 14 38 0 52" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent/20" />
      {/* People reached */}
      <circle cx="98" cy="32" r="5" className="fill-accent/25" />
      <path d="M92 44c0-3 2.5-5 6-5s6 2 6 5" className="fill-accent/20" />
      <circle cx="102" cy="58" r="4" className="fill-accent-2/30" />
      <path d="M97 68c0-2.5 2-4 5-4s5 1.5 5 4" className="fill-accent-2/20" />
    </svg>
  );
}

function LandingIllustration() {
  return (
    <svg viewBox="0 0 120 88" className="mx-auto h-20 w-full max-w-34" aria-hidden>
      {/* Browser window */}
      <rect
        x="14"
        y="10"
        width="92"
        height="68"
        rx="6"
        fill="color-mix(in srgb, var(--foreground) 5%, transparent)"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/30"
      />
      <rect x="14" y="10" width="92" height="12" rx="6" className="fill-foreground/8" />
      <circle cx="24" cy="16" r="2" className="fill-accent-2/70" />
      <circle cx="32" cy="16" r="2" className="fill-spark/70" />
      <circle cx="40" cy="16" r="2" className="fill-accent/50" />
      {/* Headline */}
      <rect x="26" y="32" width="48" height="5" rx="1.5" className="fill-foreground/30" />
      <rect x="26" y="42" width="36" height="3" rx="1" className="fill-foreground/15" />
      {/* CTA */}
      <rect
        x="26"
        y="54"
        width="32"
        height="12"
        rx="4"
        fill="color-mix(in srgb, var(--accent-2) 45%, transparent)"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-accent-2/60"
      />
      {/* Check / conversion */}
      <circle cx="88" cy="48" r="12" className="fill-accent/15" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M82 48l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      />
    </svg>
  );
}

function GrowthIllustration() {
  return (
    <svg viewBox="0 0 120 88" className="mx-auto h-20 w-full max-w-34" aria-hidden>
      {/* Chart frame */}
      <path
        d="M22 18v52h76"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-foreground/25"
      />
      {/* Bars */}
      <rect x="32" y="48" width="12" height="22" rx="2" className="fill-accent/25" />
      <rect x="50" y="38" width="12" height="32" rx="2" className="fill-accent/40" />
      <rect x="68" y="28" width="12" height="42" rx="2" className="fill-spark/55" />
      {/* Trend line */}
      <path
        d="M28 58 L44 50 L62 40 L86 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      />
      <circle cx="86" cy="22" r="4" className="fill-accent" />
      {/* Up arrow badge */}
      <circle cx="100" cy="28" r="10" className="fill-spark/20" />
      <path
        d="M100 34V22M96 26l4-4 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-spark"
      />
    </svg>
  );
}

const ILLUSTRATIONS = {
  find: SearchIllustration,
  appear: AdsIllustration,
  convince: LandingIllustration,
  grow: GrowthIllustration,
} as const;

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-foreground/30",
        vertical ? "py-1" : "px-0.5 lg:px-1",
      )}
      aria-hidden
    >
      <svg
        viewBox={vertical ? "0 0 24 28" : "0 0 36 24"}
        className={vertical ? "h-7 w-5" : "h-5 w-8 lg:w-10"}
      >
        {vertical ? (
          <path
            d="M12 2v20M12 22l-4-4M12 22l4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M2 12h28M30 12l-4-4M30 12l-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

function StepCard({
  step,
  index,
  className,
}: {
  step: (typeof STEPS)[number];
  index: number;
  className?: string;
}) {
  const tones = toneClasses(step.tone);
  const Illustration = ILLUSTRATIONS[step.id];

  return (
    <article
      className={cn(
        "relative flex min-w-0 flex-1 flex-col rounded-2xl border-2 px-4 py-5 text-center",
        tones.ring,
        className,
      )}
    >
      <span
        className={cn(
          "mx-auto flex size-8 items-center justify-center rounded-full text-xs font-bold tabular-nums",
          tones.icon,
        )}
      >
        {index + 1}
      </span>

      <div className="mt-3">
        <Illustration />
      </div>

      <h3 className="mt-3 text-base font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-5 text-foreground/65">{step.body}</p>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {step.tools.map((tool) => (
          <li
            key={tool.id}
            className="inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-1 ring-1 ring-foreground/10"
            title={tool.label}
          >
            <TechIcon id={tool.id} size={14} />
            <span className="text-[10px] font-medium text-foreground/55">
              {tool.label}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MarketingJourney() {
  return (
    <figure
      className="relative mt-10 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-4 sm:p-6 lg:p-8"
      aria-label="Percorso: ti cercano, ti faccio trovare, li convinco, faccio crescere"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 30%, color-mix(in srgb, var(--accent) 12%, transparent), transparent), radial-gradient(ellipse 40% 35% at 80% 70%, color-mix(in srgb, var(--spark) 10%, transparent), transparent)",
        }}
      />

      {/* Desktop: horizontal story */}
      <div className="relative z-10 hidden md:flex md:items-stretch">
        {STEPS.map((step, index) => (
          <div key={step.id} className="contents">
            {index > 0 ? <FlowArrow /> : null}
            <StepCard step={step} index={index} />
          </div>
        ))}
      </div>

      {/* Mobile: vertical story */}
      <div className="relative z-10 flex flex-col items-center md:hidden">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex w-full max-w-sm flex-col items-center">
            {index > 0 ? <FlowArrow vertical /> : null}
            <StepCard step={step} index={index} className="w-full" />
          </div>
        ))}
      </div>

      {/* Continuous improvement loop — one line, graphic */}
      <div className="relative z-10 mt-8 border-t border-foreground/10 pt-6">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-2">
          {[
            { label: "Guardo i dati", icon: "chart" },
            { label: "Miglioro", icon: "tune" },
            { label: "Investo di più", icon: "boost" },
          ].map((item, i) => (
            <div key={item.label} className="contents">
              {i > 0 ? (
                <span className="hidden text-foreground/25 sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-background px-3.5 py-2 text-sm font-medium">
                <LoopIcon type={item.icon as "chart" | "tune" | "boost"} />
                {item.label}
              </span>
            </div>
          ))}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent"
            aria-hidden
          >
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
              <path
                d="M4 10a6 6 0 0111.3-2.8M16 10a6 6 0 01-11.3 2.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.5 4.5v3h-3M5.5 15.5v-3h3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            e si riparte
          </span>
        </div>
      </div>

      <figcaption className="relative z-10 mt-5 text-center text-sm leading-6 text-foreground/50">
        Il marketing non è “mettere online un annuncio”: è far arrivare le
        persone giuste e trasformarle in clienti — poi ripetere ciò che funziona.
      </figcaption>
    </figure>
  );
}

function LoopIcon({ type }: { type: "chart" | "tune" | "boost" }) {
  if (type === "chart") {
    return (
      <svg viewBox="0 0 20 20" className="size-4 text-accent" aria-hidden>
        <path d="M3 15V5M3 15h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 12v3M10 8v7M14 5v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "tune") {
    return (
      <svg viewBox="0 0 20 20" className="size-4 text-spark" aria-hidden>
        <path d="M4 6h8M14 6h2M4 14h2M8 14h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-4 text-accent-2" aria-hidden>
      <path
        d="M10 16V4M6 8l4-4 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16h12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MarketingApproach() {
  return (
    <section aria-labelledby="marketing-approach-title" className="relative">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
          Come funziona
        </p>
        <h2
          id="marketing-approach-title"
          className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Dal bisogno del cliente al risultato per te
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">
          Il lavoro del pubblicitario è semplice da capire: far sì che le
          persone giuste ti trovino, ti scelgano e diventino clienti — e
          migliorare ogni settimana con i dati.
        </p>
      </div>

      <MarketingJourney />
    </section>
  );
}
