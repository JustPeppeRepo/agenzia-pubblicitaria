import { cn } from "@/lib/utils";

type AccentHairlineProps = {
  className?: string;
};

/** Gradient hairline: transparent → accent → accent-2 → transparent. */
export function AccentHairline({ className }: AccentHairlineProps) {
  return (
    <div
      aria-hidden
      className={cn("h-0.5 w-full bg-accent-hairline", className)}
    />
  );
}
