"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent shadow-sm shadow-accent/25",
  secondary:
    "border border-accent/25 text-foreground hover:border-accent/40 hover:bg-accent/5",
  ghost: "text-foreground/70 hover:text-accent hover:bg-accent/5",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
    variants[variant],
    className,
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
