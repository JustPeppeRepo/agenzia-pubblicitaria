"use client";

import dynamic from "next/dynamic";
import { DeferredMount } from "@/components/motion/DeferredMount";

const CompetitiveComparison = dynamic(
  () =>
    import("@/components/sections/CompetitiveComparison").then(
      (m) => m.CompetitiveComparison,
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[28rem] w-full" aria-hidden />,
  },
);

const PlainTalk = dynamic(
  () =>
    import("@/components/sections/PlainTalk").then((m) => m.PlainTalk),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[72rem] w-full sm:min-h-[80rem]" aria-hidden />
    ),
  },
);

export function ValueProposition() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
      />

      <DeferredMount
        className="relative z-20 mx-auto min-h-[28rem] max-w-6xl px-6 pt-12 pb-6"
        rootMargin="280px 0px"
      >
        <CompetitiveComparison />
      </DeferredMount>

      <DeferredMount
        className="min-h-[72rem] w-full sm:min-h-[80rem]"
        rootMargin="320px 0px"
      >
        <PlainTalk />
      </DeferredMount>
    </section>
  );
}
