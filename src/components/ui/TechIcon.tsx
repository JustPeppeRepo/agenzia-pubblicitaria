import {
  siExpress,
  siFramer,
  siNextdotjs,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

const TECH_ICONS: Record<string, SimpleIcon> = {
  nextjs: siNextdotjs,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  react: siReact,
  express: siExpress,
  prisma: siPrisma,
  framer: siFramer,
};

/** Dark brand marks — use foreground on dark UI */
const FOREGROUND_ICONS = new Set(["nextjs", "express", "prisma"]);

const FALLBACK_ICONS: Record<string, string> = {
  recharts: "📊",
};

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
  const icon = TECH_ICONS[id];

  if (!icon) {
    const glyph = fallback ?? FALLBACK_ICONS[id];
    if (!glyph) return null;

    return (
      <span
        className={cn("text-2xl leading-none", className)}
        aria-hidden
      >
        {glyph}
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
