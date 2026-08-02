import { getBrandIcon } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

/** Dark brand marks — use foreground on dark UI */
const FOREGROUND_ICONS = new Set([
  "nextjs",
  "express",
  "prisma",
  "vercel",
  "cursor",
]);

type TechIconProps = {
  id: string;
  fallback?: string;
  className?: string;
  size?: number;
};

export function TechIcon({
  id,
  fallback,
  className,
  size = 28,
}: TechIconProps) {
  const icon = getBrandIcon(id);

  if (!icon) {
    if (!fallback) return null;

    return (
      <span
        className={cn("text-2xl leading-none", className)}
        aria-hidden
      >
        {fallback}
      </span>
    );
  }

  const fill = FOREGROUND_ICONS.has(id)
    ? "currentColor"
    : `#${icon.hex}`;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn(
        "shrink-0",
        FOREGROUND_ICONS.has(id) && "text-foreground",
        className,
      )}
      fill={fill}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
