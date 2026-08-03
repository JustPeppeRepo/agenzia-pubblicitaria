"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { aboutMembers, aboutTeam, DOUBLE } from "@/data/site";
import { cn } from "@/lib/utils";

type AnchorVariant = "hero" | "about";

type FrameRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type TeamScrollContextValue = {
  registerAnchor: (
    variant: AnchorVariant,
    element: HTMLDivElement | null,
  ) => void;
};

const TeamScrollContext = createContext<TeamScrollContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function getSplitBlend(progress: number) {
  if (progress < 0.1) return 0;
  if (progress < 0.24) return (progress - 0.1) / 0.14;
  if (progress < 0.62) return 1;
  if (progress < 0.78) return 1 - (progress - 0.62) / 0.16;
  return 0;
}

function getFlyOpacity(progress: number) {
  if (progress <= 0.03) return 0;
  if (progress < 0.1) return (progress - 0.03) / 0.07;
  if (progress < 0.82) return 1;
  if (progress < 0.92) return 1 - (progress - 0.82) / 0.1;
  return 0;
}

function getAnchorOpacity(progress: number, variant: AnchorVariant) {
  if (variant === "hero") {
    if (progress <= 0.03) return 1;
    if (progress < 0.1) return 1 - (progress - 0.03) / 0.07;
    return 0;
  }

  if (progress >= 0.92) return 1;
  if (progress > 0.82) return (progress - 0.82) / 0.1;
  return 0;
}

function interpolateRect(
  start: FrameRect,
  end: FrameRect,
  progress: number,
): FrameRect {
  return {
    top: start.top + (end.top - start.top) * progress,
    left: start.left + (end.left - start.left) * progress,
    width: start.width + (end.width - start.width) * progress,
    height: start.height + (end.height - start.height) * progress,
  };
}

function computeProgress(
  hero: HTMLDivElement,
  about: HTMLDivElement,
  isCompact: boolean,
) {
  const scrollY = window.scrollY;
  const heroY = hero.getBoundingClientRect().top + scrollY;
  const aboutY = about.getBoundingClientRect().top + scrollY;
  const settleY = clamp(window.innerHeight * 0.58, 220, 560);
  const endScroll = aboutY - settleY;

  const startScroll = isCompact
    ? Math.max(0, heroY - window.innerHeight * 0.08)
    : 0;

  if (endScroll <= startScroll) {
    return scrollY >= endScroll ? 1 : 0;
  }

  return easeOutCubic(
    clamp((scrollY - startScroll) / (endScroll - startScroll), 0, 1),
  );
}

type TeamScrollFlyLayerProps = {
  anchorRefs: React.MutableRefObject<
    Record<AnchorVariant, HTMLDivElement | null>
  >;
  ready: boolean;
  simplifyMotion: boolean;
  isCompact: boolean;
};

/** Native scroll + rAF — no Framer Motion on the homepage critical path. */
function TeamScrollFlyLayer({
  anchorRefs,
  ready,
  simplifyMotion,
  isCompact,
}: TeamScrollFlyLayerProps) {
  const flyRef = useRef<HTMLDivElement>(null);
  const togetherRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const updateFrame = useCallback(() => {
    const fly = flyRef.current;
    const together = togetherRef.current;
    const split = splitRef.current;
    const hero = anchorRefs.current.hero;
    const about = anchorRefs.current.about;

    if (!ready || !fly || !hero || !about) {
      if (hero) hero.style.opacity = "1";
      if (about) about.style.opacity = "1";
      if (fly) fly.style.opacity = "0";
      return;
    }

    const progress = computeProgress(hero, about, isCompact);
    const heroRect = hero.getBoundingClientRect();
    const aboutRect = about.getBoundingClientRect();
    const rect = interpolateRect(
      {
        top: heroRect.top,
        left: heroRect.left,
        width: heroRect.width,
        height: heroRect.height,
      },
      {
        top: aboutRect.top,
        left: aboutRect.left,
        width: aboutRect.width,
        height: aboutRect.height,
      },
      progress,
    );

    hero.style.opacity = String(getAnchorOpacity(progress, "hero"));
    about.style.opacity = String(getAnchorOpacity(progress, "about"));

    const flyOpacity = getFlyOpacity(progress);
    const rotate = simplifyMotion ? 0 : (progress - 0.5) * -3;
    const blend =
      simplifyMotion || !DOUBLE ? 0 : getSplitBlend(progress);

    fly.style.opacity = String(flyOpacity);
    fly.style.width = `${rect.width}px`;
    fly.style.height = `${rect.height}px`;
    fly.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0) rotate(${rotate}deg)`;

    if (together) together.style.opacity = String(1 - blend);
    if (split) split.style.opacity = String(blend);
  }, [anchorRefs, isCompact, ready, simplifyMotion]);

  useEffect(() => {
    const schedule = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [updateFrame]);

  if (!ready) return null;

  return (
    <div
      ref={flyRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] shadow-lg shadow-foreground/10 will-change-transform"
      style={{ opacity: 0 }}
    >
      <div className="relative h-full w-full">
        <div ref={togetherRef} className="absolute inset-0">
          <Image
            src={aboutTeam.image}
            alt=""
            aria-hidden
            width={400}
            height={520}
            className="h-full w-full object-cover"
          />
        </div>
        {DOUBLE ? (
          <div
            ref={splitRef}
            className="absolute inset-0 flex opacity-0"
            aria-hidden
          >
            <Image
              src={aboutMembers.engineer.image}
              alt=""
              width={320}
              height={400}
              className="h-full w-1/2 object-cover"
            />
            <Image
              src={aboutMembers.advertiser.image}
              alt=""
              width={320}
              height={400}
              className="h-full w-1/2 object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

const COMPACT_VIEWPORT_QUERY = "(max-width: 767px)";

export function TeamScrollBridge({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [simplifyMotion, setSimplifyMotion] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const anchorRefs = useRef<Record<AnchorVariant, HTMLDivElement | null>>({
    hero: null,
    about: null,
  });

  useEffect(() => {
    setReady(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia(COMPACT_VIEWPORT_QUERY);

    const updateMotion = () => setSimplifyMotion(reducedMotion.matches);
    const updateCompact = () => setIsCompact(compactViewport.matches);

    updateMotion();
    updateCompact();
    reducedMotion.addEventListener("change", updateMotion);
    compactViewport.addEventListener("change", updateCompact);
    return () => {
      reducedMotion.removeEventListener("change", updateMotion);
      compactViewport.removeEventListener("change", updateCompact);
    };
  }, []);

  const registerAnchor = useCallback(
    (variant: AnchorVariant, element: HTMLDivElement | null) => {
      anchorRefs.current[variant] = element;
    },
    [],
  );

  return (
    <TeamScrollContext.Provider value={{ registerAnchor }}>
      <div className="relative">
        {children}
        <TeamScrollFlyLayer
          anchorRefs={anchorRefs}
          ready={ready}
          simplifyMotion={simplifyMotion}
          isCompact={isCompact}
        />
      </div>
    </TeamScrollContext.Provider>
  );
}

type TeamImageAnchorProps = {
  variant: AnchorVariant;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function TeamImageAnchor({
  variant,
  className,
  imageClassName,
  priority = false,
}: TeamImageAnchorProps) {
  const context = useContext(TeamScrollContext);

  const setAnchorRef = useCallback(
    (node: HTMLDivElement | null) => {
      context?.registerAnchor(variant, node);
    },
    [context, variant],
  );

  return (
    <div
      ref={setAnchorRef}
      className={cn(
        "overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] shadow-sm",
        className,
      )}
    >
      <Image
        src={aboutTeam.image}
        alt={aboutTeam.imageAlt}
        width={400}
        height={520}
        priority={priority}
        sizes="(max-width: 768px) 220px, (max-width: 1024px) 150px, 320px"
        className={cn("h-auto w-full object-cover", imageClassName)}
      />
    </div>
  );
}
