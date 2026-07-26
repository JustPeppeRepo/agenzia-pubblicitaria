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

function ChoiceLegend() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <div className="relative mt-8 grid grid-cols-1 items-center gap-3 overflow-visible py-1 sm:grid-cols-2 sm:gap-0">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-2.5 text-base font-semibold uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300">
          <span className="flex size-7 items-center justify-center rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400">
            <CrossIcon />
          </span>
          Concorrenza
        </div>
      </div>

      <span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex"
        aria-hidden
      >
        <span className="flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45 shadow-sm">
          vs
        </span>
      </span>

      <div className="flex justify-center">
        <span className="relative inline-flex overflow-visible py-1">
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
          <span className="relative inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/12 px-4 py-2.5 text-base font-semibold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
            <span className="flex size-7 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckIcon />
            </span>
            Noi
          </span>
        </span>
      </div>
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
        <div className="relative grid overflow-hidden rounded-2xl sm:grid-cols-2">
          <div className="flex flex-col border-b border-foreground/10 bg-rose-500/[0.04] p-5 opacity-90 sm:border-b-0 sm:border-r sm:p-6 dark:bg-rose-500/[0.06]">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl border border-rose-500/20 bg-background">
                <TechIcon id={competitor.techId} size={26} />
              </span>
              <p className="text-base font-semibold tracking-tight">{competitor.name}</p>
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
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap items-center gap-2 border-t border-rose-500/15 pt-3">
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
            className="relative flex flex-col bg-emerald-500/[0.07] p-5 ring-1 ring-inset ring-emerald-500/25 sm:p-6"
            initial={false}
            whileInView={
              shouldAnimate ? { opacity: [0.4, 1], x: [20, 0] } : undefined
            }
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="absolute right-4 top-4 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm shadow-emerald-500/30">
              La migliore
            </span>
            <div className="flex items-center gap-3 pr-16">
              <span className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-background shadow-sm">
                <TechIcon id={ours.techId} size={26} />
              </span>
              <p className="text-base font-semibold tracking-tight">{ours.name}</p>
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
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap items-center gap-2 border-t border-emerald-500/15 pt-3">
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
