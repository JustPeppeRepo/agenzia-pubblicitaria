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
    "bg-foreground text-background hover:bg-foreground/90 border border-transparent",
  secondary:
    "border border-foreground/20 text-foreground hover:bg-foreground/5",
  ghost: "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
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
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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
