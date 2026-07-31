import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import { CaseStudySection } from "@/components/project/CaseStudySection";
import { ProjectHeroVideo } from "@/components/project/ProjectHeroVideo";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from "@/lib/seo";

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

  const url = `/projects/${project.slug}`;
  const image = absoluteUrl(project.image);

  return {
    title: project.title,
    description: project.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.excerpt,
      url,
      images: [
        {
          url: image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Data-driven: recupero dal file locale src/data/projects.ts
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          creativeWorkJsonLd(project),
        ]}
      />
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
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent/80"
              >
                {project.liveUrl.replace(/^https?:\/\//, "")}
                <span aria-hidden className="text-xs">
                  ↗
                </span>
              </a>
            ) : null}
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
          </FadeIn>
        </div>

        <div className="relative mx-auto mb-10 max-w-6xl px-6 pb-6 md:mb-14 md:pb-10">
          <FadeIn delay={0.08}>
            {project.detailVideo ? (
              <ProjectHeroVideo
                title={project.title}
                image={project.image}
                video={project.detailVideo}
              />
            ) : (
              <div className="relative aspect-21/9 overflow-hidden rounded-t-2xl border border-white">
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
          </FadeIn>
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
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Performance &amp; audience
            </h2>
            <p className="mt-2 max-w-2xl text-foreground/65">
              Snapshot post-lancio ispirato a Vercel Speed Insights e Analytics:
              score reale, Core Web Vitals e acquisizione clienti.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground/70">
              Ancora non abbiamo dati sufficienti per visualizzarli
            </p>
            <p className="mt-2 text-sm text-foreground/45">
              Torneremo qui non appena Analytics e Speed Insights avranno
              un campione significativo.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">I Dati</h2>
          <div className="rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground/70">
              Ancora non abbiamo dati sufficienti per visualizzarli
            </p>
            <p className="mt-2 text-sm text-foreground/45">
              Le metriche e i grafici compariranno quando avremo abbastanza
              traffico post-lancio.
            </p>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
