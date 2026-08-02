import type { ReactNode } from "react";
import type { Technology } from "@/types";
import { TechIcon } from "@/components/ui/TechIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TechStackGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  technologies: Technology[];
  preface?: ReactNode;
};

export function TechStackGrid({
  eyebrow,
  title,
  description,
  technologies,
  preface,
}: TechStackGridProps) {
  return (
    <div>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {preface ? <div className="mt-12">{preface}</div> : null}

      <div className={preface ? "mt-8 grid gap-6 md:grid-cols-2" : "mt-12 grid gap-6 md:grid-cols-2"}>
        {technologies.map((tech) => (
          <article
            key={tech.id}
            className="h-full rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-foreground/20"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                <TechIcon id={tech.id} fallback={tech.icon} size={22} />
              </span>
              <div>
                <h3 className="font-semibold">{tech.name}</h3>
                <p className="text-xs text-foreground/50">
                  {tech.shortDescription}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-foreground/65">
              {tech.whyChosen}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
