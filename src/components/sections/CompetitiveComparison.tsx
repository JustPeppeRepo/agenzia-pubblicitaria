"use client";

import { motion } from "framer-motion";
import { stackDuel } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-4", className)} fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-4", className)} fill="none" aria-hidden>
      <path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-3.5", className)} fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.75 7.75a2.25 2.25 0 013.9 1.5c0 1.5-2.15 1.75-2.15 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14.25" r="0.9" fill="currentColor" />
    </svg>
  );
}

function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} fill="none" aria-hidden>
      <path
        d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} fill="none" aria-hidden>
      <path
        d="M4 16l5-5 3.5 3.5L20 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7h6v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SUMMARY_TRAITS = [
  {
    id: "speed",
    topic: "Velocità",
    competitor: "Lenta",
    ours: "Immediata",
    icon: SpeedIcon,
    tooltip:
      "Quanto in fretta si apre il sito. Se è lento, i visitatori se ne vanno prima di contattarti.",
  },
  {
    id: "security",
    topic: "Sicurezza",
    competitor: "A rischio",
    ours: "Robusta",
    icon: ShieldIcon,
    tooltip:
      "Quanto il sito resiste ad attacchi e vulnerabilità. Un sito fragile espone dati e reputazione.",
  },
  {
    id: "seo",
    topic: "SEO",
    competitor: "Non ottimizzata",
    ours: "Massimizzata",
    icon: SearchIcon,
    tooltip:
      "Quanto sei trovabile su Google. Senza SEO, anche un bel sito resta invisibile a chi cerca i tuoi servizi.",
  },
  {
    id: "scale",
    topic: "Scalabilità",
    competitor: "Assente",
    ours: "Inclusa",
    icon: ScaleIcon,
    tooltip:
      "Quanto il sito regge la crescita: più pagine, più traffico, nuovi servizi — senza doverlo rifare da zero.",
  },
] as const;

function TraitHelpTooltip({ label, text }: { label: string; text: string }) {
  return (
    <span className="group/tip relative inline-flex shrink-0">
      <button
        type="button"
        className="flex size-5 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
        aria-label={`Cos'è ${label}`}
      >
        <QuestionIcon />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full right-0 z-30 mb-2 w-[min(13.5rem,calc(100vw-2.5rem))] rounded-lg border border-foreground/10 bg-background px-3 py-2 text-left text-xs font-normal normal-case tracking-normal text-foreground/70 opacity-0 shadow-lg shadow-foreground/10 transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 md:right-auto md:left-1/2 md:-translate-x-1/2"
      >
        {text}
      </span>
    </span>
  );
}

function ChoiceLegend() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 overflow-visible py-1">
      <div className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/8 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
        <span className="flex size-6 items-center justify-center rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400">
          <CrossIcon />
        </span>
        Approccio delle agenzie concorrenti
      </div>

      <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/35">
        vs
      </span>

      <span className="relative inline-flex overflow-visible py-2">
        <motion.span
          aria-hidden
          className="absolute -inset-x-3 -inset-y-2.5 rounded-full bg-emerald-500/20 blur-xl"
          animate={
            shouldAnimate ? { opacity: [0.25, 0.55] } : undefined
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <span className="relative inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/12 px-3 py-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
          <span className="flex size-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckIcon />
          </span>
          La scelta giusta — il nostro approccio
        </span>
      </span>
    </div>
  );
}

function StackShowdown() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;
  const { competitor, ours } = stackDuel;

  return (
    <FadeIn className="mt-10">
      <article className="rounded-2xl border border-foreground/10 bg-background shadow-sm shadow-foreground/5">
        <div className="border-b border-foreground/10 px-4 py-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
            Tecnologie a confronto
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
            WordPress vs Next.js
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {SUMMARY_TRAITS.map((trait) => {
              const Icon = trait.icon;
              return (
                <div
                  key={trait.id}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.02] px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background text-foreground/70">
                        <Icon />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                        {trait.topic}
                      </p>
                    </div>
                    <TraitHelpTooltip label={trait.topic} text={trait.tooltip} />
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-700/85 dark:text-rose-300/85">
                    <CrossIcon className="size-3 shrink-0" />
                    <span className="min-w-0 break-words">{trait.competitor}</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckIcon className="size-3 shrink-0" />
                    <span className="min-w-0 break-words">{trait.ours}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative grid overflow-hidden rounded-b-2xl sm:grid-cols-2">
          <div className="border-b border-foreground/10 bg-rose-500/[0.04] p-5 opacity-90 sm:border-b-0 sm:border-r sm:p-6 dark:bg-rose-500/[0.06]">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl border border-rose-500/20 bg-background">
                <TechIcon id={competitor.techId} size={26} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700/80 dark:text-rose-300/80">
                  Concorrenza
                </p>
                <p className="text-base font-semibold tracking-tight">{competitor.name}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/55">
              {competitor.summary}
            </p>
            <ul className="mt-4 space-y-2">
              {competitor.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-6 text-foreground/55">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    <CrossIcon className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            {competitor.stackIds?.length ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-rose-500/15 pt-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-rose-800/60 dark:text-rose-300/60">
                  Tipico
                </span>
                {competitor.stackIds.map((id) => (
                  <span
                    key={id}
                    className="flex size-8 items-center justify-center rounded-lg border border-rose-500/20 bg-background opacity-80"
                    title={id}
                  >
                    <TechIcon id={id} size={18} />
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            aria-hidden
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45 shadow-sm">
              vs
            </span>
          </div>

          <motion.div
            className="relative bg-emerald-500/[0.07] p-5 ring-1 ring-inset ring-emerald-500/25 sm:p-6"
            initial={false}
            whileInView={
              shouldAnimate ? { opacity: [0.4, 1], x: [20, 0] } : undefined
            }
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="absolute right-4 top-4 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm shadow-emerald-500/30">
              Vince
            </span>
            <div className="flex items-center gap-3 pr-16">
              <span className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-background shadow-sm">
                <TechIcon id={ours.techId} size={26} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  Il nostro stack
                </p>
                <p className="text-base font-semibold tracking-tight">{ours.name}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {ours.summary}
            </p>
            <ul className="mt-4 space-y-2">
              {ours.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-sm font-medium leading-6 text-foreground/85"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <CheckIcon className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            {ours.stackIds?.length ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-emerald-500/15 pt-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-800/70 dark:text-emerald-300/70">
                  Con
                </span>
                {ours.stackIds.map((id) => (
                  <span
                    key={id}
                    className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-background"
                  >
                    <TechIcon id={id} size={18} />
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </article>
    </FadeIn>
  );
}

export function CompetitiveComparison() {
  return (
    <div>
      <FadeIn>
        <SectionHeading
          eyebrow="Il confronto"
          title="Due strade. Una sola scelta chiara."
          description="A sinistra ciò che trovi di solito. A destra ciò che costruiamo noi — evidenziato in verde, perché è quello che porta risultati."
        />
        <ChoiceLegend />
      </FadeIn>

      <StackShowdown />
    </div>
  );
}
