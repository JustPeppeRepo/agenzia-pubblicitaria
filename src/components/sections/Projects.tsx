import Image from "next/image";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProjectsProps = {
  limit?: number;
  showViewAll?: boolean;
  variant?: "featured" | "full";
};

export function Projects({
  limit,
  showViewAll = false,
  variant = "featured",
}: ProjectsProps) {
  const items = limit ? projects.slice(0, limit) : projects;
  const isFeatured = variant === "featured";

  const content = (
    <>
      {isFeatured ? (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Progetti selezionati"
            description="Alcuni lavori recenti che raccontano il nostro approccio creativo."
          />
          {showViewAll ? (
            <Button href="/progetti" variant="secondary" className="shrink-0">
              Tutti i progetti
            </Button>
          ) : null}
        </div>
      ) : null}

      <div className={isFeatured ? "mt-12 grid gap-6 md:grid-cols-2" : "grid gap-6 md:grid-cols-2"}>
          {items.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-colors hover:border-foreground/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
                  {project.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-foreground/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
    </>
  );

  if (isFeatured) {
    return (
      <section className="border-y border-foreground/10 bg-foreground/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-6">{content}</div>
      </section>
    );
  }

  return content;
}
