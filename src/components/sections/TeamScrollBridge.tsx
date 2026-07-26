"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { aboutMembers, aboutTeam } from "@/data/site";
import { cn } from "@/lib/utils";

type AnchorVariant = "hero" | "about";

type FrameRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type TeamScrollContextValue = {
  registerAnchor: (variant: AnchorVariant, element: HTMLDivElement | null) => void;
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

function interpolateRect(start: FrameRect, end: FrameRect, progress: number): FrameRect {
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
  // Land while the about slot is still lower in the viewport, so the fly
  // layer settles before it can cover the About copy during scroll.
  const settleY = clamp(window.innerHeight * 0.58, 220, 560);
  const endScroll = aboutY - settleY;

  // On mobile the hero image sits below the fold. Keep it still until the
  // user has scrolled it near the top — otherwise it flies off before
  // they ever see it in place.
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
  anchorRefs: React.MutableRefObject<Record<AnchorVariant, HTMLDivElement | null>>;
  ready: boolean;
  simplifyMotion: boolean;
  isCompact: boolean;
};

function TeamScrollFlyLayer({
  anchorRefs,
  ready,
  simplifyMotion,
  isCompact,
}: TeamScrollFlyLayerProps) {
  const { scrollY } = useScroll();
  const top = useMotionValue(0);
  const left = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const opacity = useMotionValue(0);
  const rotate = useMotionValue(0);
  const splitBlend = useMotionValue(0);

  const updateFrame = useCallback(() => {
    const hero = anchorRefs.current.hero;
    const about = anchorRefs.current.about;

    if (!ready || !hero || !about) {
      if (hero) hero.style.opacity = "1";
      if (about) about.style.opacity = "1";
      opacity.set(0);
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
    top.set(rect.top);
    left.set(rect.left);
    width.set(rect.width);
    height.set(rect.height);
    opacity.set(flyOpacity);
    rotate.set(simplifyMotion ? 0 : (progress - 0.5) * -3);
    splitBlend.set(simplifyMotion ? 0 : getSplitBlend(progress));
  }, [
    anchorRefs,
    height,
    isCompact,
    left,
    opacity,
    ready,
    rotate,
    simplifyMotion,
    splitBlend,
    top,
    width,
  ]);

  useMotionValueEvent(scrollY, "change", updateFrame);

  useEffect(() => {
    updateFrame();
    window.addEventListener("resize", updateFrame);
    return () => window.removeEventListener("resize", updateFrame);
  }, [updateFrame]);

  if (!ready) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-40 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] shadow-lg shadow-foreground/10"
      style={{ top, left, width, height, opacity, rotate }}
    >
      <SplitBlendFrame splitBlend={splitBlend} />
    </motion.div>
  );
}

function SplitBlendFrame({ splitBlend }: { splitBlend: MotionValue<number> }) {
  const togetherOpacity = useMotionValue(1);
  const splitOpacity = useMotionValue(0);

  useMotionValueEvent(splitBlend, "change", (value) => {
    togetherOpacity.set(1 - value);
    splitOpacity.set(value);
  });

  return (
    <div className="relative h-full w-full">
      <motion.div className="absolute inset-0" style={{ opacity: togetherOpacity }}>
        <Image
          src={aboutTeam.image}
          alt=""
          aria-hidden
          width={400}
          height={520}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <motion.div className="absolute inset-0 flex" style={{ opacity: splitOpacity }} aria-hidden>
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
      </motion.div>
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
        className={cn("h-auto w-full object-cover", imageClassName)}
      />
    </div>
  );
}
