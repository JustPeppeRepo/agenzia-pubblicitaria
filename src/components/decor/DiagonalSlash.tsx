import { cn } from "@/lib/utils";

type DiagonalSlashProps = {
  className?: string;
};

/** Inclined color band used as a section separator. */
export function DiagonalSlash({ className }: DiagonalSlashProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative h-12 w-full overflow-hidden sm:h-14",
        className,
      )}
    >
      <div
        className="absolute inset-x-[-12%] top-1/2 h-10 -translate-y-1/2 -rotate-[4deg] sm:h-12"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-2) 16%, transparent), transparent)",
        }}
      />
    </div>
  );
}
