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

function CompetitorLegend() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-xl border border-rose-500/55 bg-rose-500/22 px-4 py-2.5 text-base font-semibold uppercase tracking-[0.14em] text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/12 dark:text-rose-300">
      <span className="flex size-7 items-center justify-center rounded-md bg-rose-500/35 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400">
        <CrossIcon />
      </span>
      Concorrenza
    </div>
  );
}

function OursLegend({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <span className="relative inline-flex overflow-visible py-1">
      <motion.span
        aria-hidden
        className="absolute -inset-x-3 -inset-y-2.5 rounded-full bg-emerald-500/50 blur-xl dark:bg-emerald-500/25"
        animate={shouldAnimate ? { opacity: [0.45, 0.85] } : undefined}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <span className="relative inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/65 bg-emerald-500/28 px-4 py-2.5 text-base font-semibold uppercase tracking-[0.14em] text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/14 dark:text-emerald-300">
        <span className="flex size-7 items-center justify-center rounded-md bg-emerald-500/40 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-400">
          <CheckIcon />
        </span>
        Noi
      </span>
    </span>
  );
}

function VsBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex",
        className,
      )}
      aria-hidden
    >
      <span className="flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45 shadow-sm">
        vs
      </span>
    </span>
  );
}

function StackShowdown() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;
  const { competitor, ours } = stackDuel;

  return (
    <FadeIn className="mt-8">
      <div className="relative grid grid-cols-1 items-stretch gap-3 overflow-visible py-1 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-8">
        <div className="order-1 flex justify-center">
          <CompetitorLegend />
        </div>

        <div className="order-3 flex justify-center sm:order-2">
          <OursLegend shouldAnimate={shouldAnimate} />
        </div>

        <VsBadge className="top-[calc(0.25rem+1.55rem)]" />

        <div className="order-2 flex flex-col rounded-2xl border-2 border-rose-500/50 border-b-rose-500/70 bg-rose-500/[0.16] p-5 shadow-md shadow-rose-500/15 sm:order-3 sm:rounded-r-none sm:border-r-0 sm:p-6 sm:shadow-none dark:border dark:border-rose-500/25 dark:border-b-rose-500/40 dark:bg-rose-500/[0.08] dark:shadow-foreground/5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl border border-rose-500/45 bg-rose-500/10 dark:border-rose-500/25 dark:bg-background">
              <TechIcon id={competitor.techId} size={26} />
            </span>
            <p className="text-base font-semibold tracking-tight text-rose-950 dark:text-foreground">
              {competitor.name}
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-rose-950/65 dark:text-foreground/55">
            {competitor.summary}
          </p>
          <ul className="mt-4 space-y-2">
            {competitor.points.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm leading-6 text-rose-950/65 dark:text-foreground/55"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-rose-500/40 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400">
                  <CrossIcon className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          {competitor.stackIds?.length ? (
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center gap-2 border-t border-rose-500/40 pt-3 dark:border-rose-500/20">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-rose-800 dark:text-rose-300/60">
                  Tipico
                </span>
                {competitor.stackIds.map((id) => (
                  <span
                    key={id}
                    className="flex size-8 items-center justify-center rounded-lg border border-rose-500/40 bg-background opacity-80 dark:border-rose-500/25"
                    title={id}
                  >
                    <TechIcon id={id} size={18} />
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <motion.div
          className="relative order-4 flex flex-col rounded-2xl border-2 border-emerald-500/60 border-b-emerald-500/80 bg-emerald-500/[0.18] p-5 shadow-md shadow-emerald-500/20 ring-1 ring-inset ring-emerald-500/45 sm:rounded-l-none sm:border-l-0 sm:p-6 sm:shadow-none dark:border dark:border-emerald-500/30 dark:border-b-emerald-500/50 dark:bg-emerald-500/[0.09] dark:shadow-foreground/5 dark:ring-emerald-500/25"
          initial={false}
          whileInView={
            shouldAnimate ? { opacity: [0.4, 1], x: [20, 0] } : undefined
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <VsBadge className="left-0 top-1/2" />
          <span className="absolute right-4 top-4 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md shadow-emerald-600/45 dark:bg-emerald-500 dark:shadow-emerald-500/40">
            La migliore
          </span>
          <div className="flex items-center gap-3 pr-16">
            <span className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/50 bg-emerald-500/12 shadow-sm dark:border-emerald-500/30 dark:bg-background">
              <TechIcon id={ours.techId} size={26} />
            </span>
            <p className="text-base font-semibold tracking-tight text-emerald-950 dark:text-foreground">
              {ours.name}
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-emerald-950/75 dark:text-foreground/75">
            {ours.summary}
          </p>
          <ul className="mt-4 space-y-2">
            {ours.points.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm font-medium leading-6 text-emerald-950/85 dark:text-foreground/85"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/45 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-400">
                  <CheckIcon className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          {ours.stackIds?.length ? (
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center gap-2 border-t border-emerald-500/45 pt-3 dark:border-emerald-500/20">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-900 dark:text-emerald-300/70">
                  Con
                </span>
                {ours.stackIds.map((id) => (
                  <span
                    key={id}
                    className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/45 bg-background dark:border-emerald-500/25"
                  >
                    <TechIcon id={id} size={18} />
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </FadeIn>
  );
}

export function CompetitiveComparison() {
  return (
    <div>
      <FadeIn>
        <SectionHeading
          eyebrow="Il confronto"
          title="Scegli la differenza."
          description="Guarda tu stesso il divario tra le soluzioni standard e il nostro approccio, evidenziato in verde perché è l'unico orientato ai risultati."
        />
      </FadeIn>

      <StackShowdown />
    </div>
  );
}
