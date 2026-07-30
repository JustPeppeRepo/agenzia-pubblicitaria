import { cn } from "@/lib/utils";

type SectionMeshProps = {
  className?: string;
};

/** Soft multi-orb brand mesh for section atmosphere (SSR-safe, no motion). */
export function SectionMesh({ className }: SectionMeshProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-brand-mesh", className)}
    />
  );
}
