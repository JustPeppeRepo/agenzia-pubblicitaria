"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { prefersReducedMotion } = useMotionSafe();

  const previewSrc = project.previewVideo
    ? isMobile
      ? project.previewVideo.mobile
      : project.previewVideo.desktop
    : undefined;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (previewSrc && videoRef.current && !prefersReducedMotion) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        /* Autoplay blocked — fallback to static image */
      });
    }
  }, [previewSrc, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <motion.article
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-foreground/10 transition-colors hover:border-accent/35 hover:shadow-md hover:shadow-accent/10"
    >
      <Link href={`/projects/${project.slug}`} className="flex h-full min-h-0 flex-1 flex-col">
        <div className="relative aspect-video shrink-0 overflow-hidden bg-black">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && previewSrc && !prefersReducedMotion
                ? "opacity-0"
                : "opacity-100",
            )}
          />

          {previewSrc && !prefersReducedMotion ? (
            <video
              key={previewSrc}
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={project.image}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <source src={previewSrc} type="video/mp4" />
            </video>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold transition-colors group-hover:text-foreground/80">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
            {project.excerpt}
          </p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-4">
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
      </Link>
    </motion.article>
  );
}
