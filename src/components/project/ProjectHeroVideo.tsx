"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectVideoSet } from "@/types";
import { cn } from "@/lib/utils";

type ProjectHeroVideoProps = {
  title: string;
  image: string;
  video: ProjectVideoSet;
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      {/* Triangle centered in the 24×24 viewBox */}
      <path d="M9.5 7.2v9.6L17.3 12 9.5 7.2Z" />
    </svg>
  );
}

function DeviceScreen({
  title,
  image,
  src,
  sizes,
  className,
  imagePriority = false,
  compact = false,
}: {
  title: string;
  image: string;
  src: string;
  sizes: string;
  className?: string;
  imagePriority?: boolean;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleToggle() {
    const el = videoRef.current;
    if (!el) return;

    if (playing) {
      el.pause();
      el.currentTime = 0;
      setPlaying(false);
      return;
    }

    // play() only from this click handler — never on mount / inView
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-black",
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority={imagePriority}
        sizes={sizes}
        className={cn(
          "object-contain transition-opacity",
          playing ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Always mounted, never autoplay — starts only via handleToggle */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        poster={image}
        className={cn(
          "absolute inset-0 h-full w-full object-contain",
          playing ? "z-[1] opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={playing ? handleToggle : undefined}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!playing ? (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={`Riproduci video — ${title}`}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 text-white backdrop-blur-[1px] transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-foreground/15",
              compact ? "size-10" : "size-16 sm:size-20",
            )}
          >
            <PlayIcon
              className={compact ? "size-5" : "size-7 sm:size-9"}
            />
          </span>
        </button>
      ) : null}
    </div>
  );
}

export function ProjectHeroVideo({ title, image, video }: ProjectHeroVideoProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative pb-4 sm:pb-2 md:pb-0">
        <div className="relative z-0 pr-[8%] sm:pr-[6%]">
          <div className="rounded-t-[1.1rem] border border-foreground/15 bg-[#1c1c1e] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] dark:bg-[#0a0a0b] md:rounded-t-[1.35rem] md:p-2.5">
            <div className="mb-1.5 flex items-center justify-center md:mb-2">
              <span className="h-1 w-14 rounded-full bg-foreground/20 md:h-1.5 md:w-16" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black md:rounded-lg">
              <DeviceScreen
                title={`${title} — desktop`}
                image={image}
                src={video.desktop}
                sizes="(max-width: 1024px) 90vw, 900px"
                imagePriority
              />
            </div>
          </div>

          <div className="relative mx-auto h-2.5 w-[calc(100%+1.5rem)] max-w-none rounded-b-xl bg-linear-to-b from-[#2a2a2c] to-[#161618] dark:from-[#141416] dark:to-[#050506] md:h-3.5 md:w-[calc(100%+2rem)] md:rounded-b-2xl">
            <div className="absolute inset-x-[28%] top-0 h-px bg-white/10" />
            <div className="absolute left-1/2 top-1 h-0.5 w-16 -translate-x-1/2 rounded-full bg-foreground/15 md:top-1.5 md:h-1 md:w-24" />
          </div>
          <div className="mx-auto h-1 w-[70%] rounded-b-full bg-foreground/10 blur-[1px]" />
        </div>

        <div
          className={cn(
            "absolute z-10",
            "right-0 bottom-0 w-[34%] min-w-27 max-w-50",
            "translate-y-[8%]",
            "sm:w-[30%] sm:max-w-55 sm:translate-y-[4%]",
            "md:w-[26%] md:max-w-60 md:translate-x-[4%] md:translate-y-[2%]",
          )}
        >
          <div className="relative rounded-[1.35rem] border-[3px] border-[#2a2a2c] bg-[#1c1c1e] p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] dark:border-[#3a3a3c] dark:bg-[#0a0a0b] sm:rounded-[1.6rem] sm:border-4 sm:p-1.5 md:rounded-[1.85rem]">
            <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-3 w-12 -translate-x-1/2 rounded-full bg-black sm:top-2.5 sm:h-3.5 sm:w-14 md:top-3 md:h-4 md:w-16" />

            <div className="relative aspect-9/16 overflow-hidden rounded-[1.05rem] bg-black sm:rounded-[1.25rem] md:rounded-[1.4rem]">
              <DeviceScreen
                title={`${title} — mobile`}
                image={video.mobilePoster ?? image}
                src={video.mobile}
                sizes="(max-width: 768px) 30vw, 240px"
                compact
              />
            </div>

            <div className="mx-auto mt-1 h-0.5 w-8 rounded-full bg-foreground/25 sm:mt-1.5 sm:h-1 sm:w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
