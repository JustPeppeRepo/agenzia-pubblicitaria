import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  /** Page-level title uses h1; section titles default to h2. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
  as: TitleTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-[0.2em]",
            title || description ? "mb-3" : null,
            dark ? "text-accent-foreground/70" : "text-accent-2",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <TitleTag
          className={cn(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            dark ? "text-accent-foreground" : "text-foreground",
          )}
        >
          {title}
        </TitleTag>
      ) : null}
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 sm:text-lg",
            dark ? "text-accent-foreground/75" : "text-foreground/65",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
