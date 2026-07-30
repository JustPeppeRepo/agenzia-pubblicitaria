import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import { CaseStudySection } from "@/components/project/CaseStudySection";
import { ProjectHeroVideo } from "@/components/project/ProjectHeroVideo";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const MetricsTable = dynamic(
  () =>
    import("@/components/project/MetricsTable").then((m) => m.MetricsTable),
  { loading: () => <MetricsSkeleton /> },
);

const MetricsChart = dynamic(
  () =>
    import("@/components/project/MetricsChart").then((m) => m.MetricsChart),
  { loading: () => <MetricsSkeleton /> },
);

function MetricsSkeleton() {
  return (
    <div className="h-48 animate-pulse rounded-2xl bg-foreground/5" />
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** SSG: genera una pagina statica per ogni slug in src/data/projects.ts */
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Progetto non trovato" };

  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Data-driven: recupero dal file locale src/data/projects.ts
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      {/* Hero */}
      <div className="relative border-b border-foreground/10">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <FadeIn>
            <Link
              href="/#projects"
              className="mb-6 inline-flex text-sm text-foreground/50 transition-colors hover:text-foreground"
            >
              ← Tutti i progetti
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
              {project.category}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/65">
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
            {project.liveUrl ? (
              <div className="mt-6">
                <Button href={project.liveUrl} external variant="secondary">
                  Visita il sito live
                </Button>
              </div>
            ) : null}
          </FadeIn>
        </div>

        <div className="relative mx-auto mb-8 aspect-[21/9] max-w-6xl overflow-hidden rounded-t-2xl px-6">
          {project.detailVideo ? (
            <ProjectHeroVideo
              title={project.title}
              image={project.image}
              video={project.detailVideo}
            />
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-t-2xl border border-white">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Case study body */}
      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
        <CaseStudySection title="Il Problema">
          <p>{project.problem}</p>
        </CaseStudySection>

        <CaseStudySection title="La Soluzione">
          <p>{project.solution}</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            {project.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySection>

        <FadeIn className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Stack utilizzato</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-foreground/15 px-4 py-1.5 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">I Dati</h2>
          <p className="text-foreground/65">
            Metriche simulate post-lancio — dimostrano l&apos;impatto misurabile
            delle scelte tecniche.
          </p>
          <MetricsTable metrics={project.metrics} />
          <MetricsChart data={project.chartData} />
        </FadeIn>
      </div>
    </article>
  );
}
