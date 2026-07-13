import { cn } from "@/lib/utils";

type ValuePropositionVisualProps = {
  id: string;
  className?: string;
};

function ScoreRing({ value, label }: { value: number; label: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative size-[4.5rem]">
        <svg
          viewBox="0 0 64 64"
          className="size-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-foreground/10"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-emerald-500"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-bold tabular-nums">
          {value}
        </span>
      </div>
      <span className="mt-1.5 max-w-[4.75rem] text-center text-[10px] leading-tight text-foreground/55">
        {label}
      </span>
    </div>
  );
}

function PerformanceVisual() {
  return (
    <div
      role="img"
      aria-label="Punteggi PageSpeed simulati: Performance 98, Accessibilità 100, Best practice 96, SEO 100"
      className="flex h-full flex-col justify-center"
    >
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-foreground/45">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
        PageSpeed Insights
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
        <ScoreRing value={98} label="Performance" />
        <ScoreRing value={100} label="Accessibilità" />
        <ScoreRing value={96} label="Best practice" />
        <ScoreRing value={100} label="SEO" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          LCP 0.8s
        </span>
        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          FCP 0.4s
        </span>
        <span className="rounded-md bg-foreground/5 px-2 py-1 text-[10px] font-medium text-foreground/55">
          Mobile ✓
        </span>
      </div>
    </div>
  );
}

function SeoVisual() {
  return (
    <div
      role="img"
      aria-label="Anteprima risultato Google in prima posizione con crescita delle impressioni"
      className="flex h-full flex-col justify-center"
    >
      <div className="rounded-xl border border-foreground/10 bg-background p-3 shadow-sm">
        <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 shrink-0 text-foreground/40"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="truncate text-[11px] text-foreground/55">
            idraulico milano zona nord
          </span>
        </div>

        <div className="relative mt-3 rounded-lg border-l-[3px] border-emerald-500 bg-emerald-500/[0.06] p-2.5">
          <span className="absolute -top-2 left-2 rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            1° posizione
          </span>
          <p className="mt-1 text-xs font-semibold text-[#1a0dab] dark:text-blue-400">
            Il Tuo Business — Interventi rapidi 24h
          </p>
          <p className="mt-0.5 text-[10px] text-foreground/45">
            ★★★★★ · 127 recensioni · Milano
          </p>
          <p className="mt-0.5 text-[10px] text-emerald-700 dark:text-emerald-400">
            www.tuosito.it
          </p>
        </div>

        <div className="mt-2 space-y-1.5 opacity-40">
          <div className="h-2 w-3/4 rounded bg-foreground/15" />
          <div className="h-1.5 w-1/2 rounded bg-foreground/10" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between gap-1">
          {[28, 42, 55, 72, 100].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-emerald-500/70"
              style={{ height: `${height * 0.28}px` }}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] font-medium text-foreground/50">
          Impressioni Google{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            +340%
          </span>
        </p>
      </div>
    </div>
  );
}

function AnimationsVisual() {
  return (
    <div
      role="img"
      aria-label="Anteprima sito con animazioni che guidano verso il pulsante di contatto"
      className="flex h-full flex-col justify-center"
    >
      <div className="overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.03] px-3 py-2">
          <span className="size-2 rounded-full bg-red-400/70" aria-hidden />
          <span className="size-2 rounded-full bg-yellow-400/70" aria-hidden />
          <span className="size-2 rounded-full bg-green-400/70" aria-hidden />
          <span className="ml-2 h-2 flex-1 rounded bg-foreground/10" aria-hidden />
        </div>
        <div className="relative p-4">
          <div className="h-2.5 w-2/3 rounded bg-foreground/20" aria-hidden />
          <div className="mt-2 h-2 w-1/2 rounded bg-foreground/10" aria-hidden />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded bg-foreground/10" aria-hidden />
            <div className="aspect-[4/3] rounded bg-foreground/8" aria-hidden />
            <div className="aspect-[4/3] rounded bg-foreground/6" aria-hidden />
          </div>

          <div className="relative mt-4 flex justify-center">
            <div
              className="absolute inset-x-6 -inset-y-1 rounded-lg bg-emerald-500/20 motion-safe:animate-pulse"
              aria-hidden
            />
            <span className="relative rounded-lg bg-foreground px-4 py-2 text-[10px] font-semibold text-background">
              Contattaci ora
            </span>
          </div>

          <svg
            viewBox="0 0 24 24"
            className="absolute bottom-3 right-5 size-5 text-foreground/70 motion-safe:animate-bounce"
            aria-hidden
          >
            <path
              d="M5 3l14 9-14 9V3z"
              fill="currentColor"
              transform="rotate(90 12 12)"
            />
          </svg>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] font-medium text-foreground/50">
        Lo sguardo segue il percorso verso l&apos;azione
      </p>
    </div>
  );
}

function CodeVisual() {
  const layers = [
    { label: "Frontend", detail: "Next.js · UI veloce", width: "100%" },
    { label: "API", detail: "Solo se serve", width: "78%", optional: true },
    { label: "Database", detail: "Quando cresci", width: "58%", optional: true },
  ];

  return (
    <div
      role="img"
      aria-label="Architettura modulare che cresce con il business senza rifare tutto"
      className="flex h-full flex-col justify-center"
    >
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div key={layer.label} className="flex items-center gap-2">
            <div
              className={cn(
                "rounded-lg border px-3 py-2 transition-all",
                index === 0
                  ? "border-foreground/20 bg-foreground/[0.06]"
                  : "border-foreground/10 bg-foreground/[0.03]",
              )}
              style={{ width: layer.width }}
            >
              <p className="text-[11px] font-semibold">{layer.label}</p>
              <p className="text-[9px] text-foreground/50">{layer.detail}</p>
            </div>
            {layer.optional ? (
              <span className="shrink-0 rounded-full bg-foreground/5 px-2 py-0.5 text-[9px] text-foreground/45">
                opz.
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex flex-1 items-end gap-1">
          {[35, 48, 62, 80, 100].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-foreground/15"
              style={{ height: `${height * 0.22}px` }}
              aria-hidden
            />
          ))}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            +3 anni
          </p>
          <p className="text-[9px] text-foreground/45">senza rifare tutto</p>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.JSX.Element> = {
  performance: PerformanceVisual,
  seo: SeoVisual,
  animations: AnimationsVisual,
  code: CodeVisual,
};

export function ValuePropositionVisual({ id, className }: ValuePropositionVisualProps) {
  const Visual = visuals[id];

  if (!Visual) return null;

  return (
    <div className={cn("min-h-[11rem]", className)}>
      <Visual />
    </div>
  );
}
