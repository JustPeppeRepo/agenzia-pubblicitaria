"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import type { ProjectVideoSet } from "@/types";

type ProjectHeroVideoProps = {
  title: string;
  image: string;
  video: ProjectVideoSet;
};

export function ProjectHeroVideo({ title, image, video }: ProjectHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const src = isMobile ? video.mobile : video.desktop;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !mounted) return;

    if (prefersReducedMotion) {
      el.pause();
      return;
    }

    el.load();
    el.play().catch(() => {
      /* Autoplay blocked — poster image remains visible underneath */
    });
  }, [src, mounted, prefersReducedMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-2xl border border-white bg-black">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1152px"
        className="object-cover"
      />

      {mounted && !prefersReducedMotion ? (
        <video
          key={src}
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster={image}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
