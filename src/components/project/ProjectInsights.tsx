"use client";

import { useEffect, useState } from "react";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import type {
  ProjectInsights as ProjectInsightsData,
  ProjectVitalRating,
} from "@/types";
import { cn } from "@/lib/utils";

type ProjectInsightsProps = {
  insights: ProjectInsightsData;
};

const ratingStyles: Record<
  ProjectVitalRating,
  { label: string; className: string }
> = {
  good: {
    label: "Buono",
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  "needs-improvement": {
    label: "Da migliorare",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  poor: {
    label: "Scarso",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
  },
};

function ScoreRing({ score }: { score: number }) {
  const { prefersReducedMotion } = useMotionSafe();
  const [drawn, setDrawn] = useState(false);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score)) / 100;
  const offset = circumference * (1 - progress);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDrawn(true);
      return;
    }
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-foreground/10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-accent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: drawn ? offset : circumference,
            transition: prefersReducedMotion
              ? undefined
              : "stroke-dashoffset 1.1s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          {score}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/45">
          / 100
        </span>
      </div>
    </div>
  );
}

export function ProjectInsights({ insights }: ProjectInsightsProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-linear-to-br from-accent/7 via-transparent to-spark/6 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">
            Real Experience Score
          </p>
          <p className="mt-1 text-sm text-foreground/60">
            Aggregato Core Web Vitals · stile Vercel Speed Insights
          </p>
          <div className="mt-6">
            <ScoreRing score={insights.performanceScore} />
          </div>
          <p className="mt-4 text-center text-sm text-foreground/55">
            {insights.performanceScore >= 90
              ? "Esperienza eccellente su desktop e mobile"
              : insights.performanceScore >= 75
                ? "Performance solida, con margini di ottimizzazione"
                : "Ci sono aree da migliorare per l’esperienza reale"}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {insights.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-5"
            >
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/45">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
              {stat.delta ? (
                <p
                  className={cn(
                    "mt-2 text-sm font-medium",
                    stat.deltaPositive === false
                      ? "text-red-600 dark:text-red-400"
                      : "text-emerald-600 dark:text-emerald-400",
                  )}
                >
                  {stat.delta}
                  {stat.deltaLabel ? (
                    <span className="ml-1 font-normal text-foreground/45">
                      {stat.deltaLabel}
                    </span>
                  ) : null}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Core Web Vitals
          </h3>
          <p className="mt-1 text-sm text-foreground/55">
            Metriche misurate su traffico reale (p75), come su Vercel Analytics
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {insights.vitals.map((vital) => {
            const rating = ratingStyles[vital.rating];
            return (
              <div
                key={vital.id}
                className="rounded-2xl border border-foreground/10 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-foreground/70">
                    {vital.label}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      rating.className,
                    )}
                  >
                    {rating.label}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
                  {vital.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-foreground/50">
                  {vital.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
