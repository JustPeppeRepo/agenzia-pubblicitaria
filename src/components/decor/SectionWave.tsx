import { cn } from "@/lib/utils";

type SectionWaveProps = {
  /** Flip wave vertically (e.g. top of a section). */
  flip?: boolean;
  /** Fill tone — warm matches the yellow About band. */
  tone?: "section" | "warm";
  className?: string;
};

/** Full-bleed wave separator filled with section or warm tint. */
export function SectionWave({
  flip = false,
  tone = "section",
  className,
}: SectionWaveProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative w-full leading-[0]",
        tone === "warm" ? "text-warm" : "text-section",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className={cn("block h-10 w-full sm:h-14", flip && "rotate-180")}
      >
        <path
          fill="currentColor"
          d="M0,28 C180,56 360,4 540,22 C720,40 900,60 1080,36 C1260,12 1350,20 1440,28 L1440,64 L0,64 Z"
        />
      </svg>
    </div>
  );
}
