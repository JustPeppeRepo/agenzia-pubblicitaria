import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
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
            "mb-3 text-sm font-medium uppercase tracking-[0.2em]",
            dark ? "text-accent-foreground/70" : "text-accent-2",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-accent-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
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
