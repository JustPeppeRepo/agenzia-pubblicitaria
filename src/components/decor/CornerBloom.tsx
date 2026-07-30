import { cn } from "@/lib/utils";

type CornerBloomProps = {
  /** Which brand color drives the bloom. */
  tone?: "accent" | "accent-2" | "spark";
  position?: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  className?: string;
};

const toneClass = {
  accent: "bg-accent/20",
  "accent-2": "bg-accent-2/20",
  spark: "bg-spark/20",
} as const;

const positionClass = {
  "top-right": "-right-32 top-1/4",
  "bottom-left": "-left-28 bottom-0",
  "top-left": "-left-28 top-0",
  "bottom-right": "-right-28 bottom-0",
} as const;

/** Soft colored blur orb for section corners. */
export function CornerBloom({
  tone = "accent",
  position = "top-right",
  className,
}: CornerBloomProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-80 w-80 rounded-full blur-3xl sm:h-96 sm:w-96",
        toneClass[tone],
        positionClass[position],
        className,
      )}
    />
  );
}
