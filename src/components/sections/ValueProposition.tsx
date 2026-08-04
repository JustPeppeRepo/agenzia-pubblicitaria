import dynamic from "next/dynamic";

const CompetitiveComparison = dynamic(
  () =>
    import("@/components/sections/CompetitiveComparison").then(
      (m) => m.CompetitiveComparison,
    ),
  {
    loading: () => (
      <div className="min-h-[28rem] w-full" aria-hidden />
    ),
  },
);

const PlainTalk = dynamic(
  () =>
    import("@/components/sections/PlainTalk").then((m) => m.PlainTalk),
  {
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

      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-6">
        <CompetitiveComparison />
      </div>
      <PlainTalk />
    </section>
  );
}
