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
  type ReactNode,
} from "react";
import { aboutMembers, aboutTeam } from "@/data/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";
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

function getSplitBlend(progress: number) {
  if (progress < 0.12) return 0;
  if (progress < 0.28) return (progress - 0.12) / 0.16;
  if (progress < 0.72) return 1;
  if (progress < 0.88) return 1 - (progress - 0.72) / 0.16;
  return 0;
}

function getFlyOpacity(progress: number) {
  if (progress <= 0.03) return 0;
  if (progress < 0.1) return (progress - 0.03) / 0.07;
  if (progress < 0.9) return 1;
  if (progress < 0.97) return 1 - (progress - 0.9) / 0.07;
  return 0;
}

function getAnchorOpacity(progress: number, variant: AnchorVariant) {
  if (variant === "hero") {
    if (progress <= 0.03) return 1;
    if (progress < 0.1) return 1 - (progress - 0.03) / 0.07;
    return 0;
  }

  if (progress >= 0.97) return 1;
  if (progress > 0.9) return (progress - 0.9) / 0.07;
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

function computeProgress(hero: HTMLDivElement, about: HTMLDivElement) {
  const heroY = hero.getBoundingClientRect().top + window.scrollY;
  const aboutY = about.getBoundingClientRect().top + window.scrollY;
  const distance = aboutY - heroY;

  if (distance <= 0) return 0;

  return clamp(window.scrollY / distance, 0, 1);
}

type TeamScrollFlyLayerProps = {
  anchorRefs: React.MutableRefObject<Record<AnchorVariant, HTMLDivElement | null>>;
  enabled: boolean;
};

function TeamScrollFlyLayer({ anchorRefs, enabled }: TeamScrollFlyLayerProps) {
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

    if (!enabled || !hero || !about) {
      if (hero) hero.style.opacity = "1";
      if (about) about.style.opacity = "1";
      opacity.set(0);
      return;
    }

    const progress = computeProgress(hero, about);
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
    rotate.set((progress - 0.5) * -3);
    splitBlend.set(getSplitBlend(progress));
  }, [anchorRefs, enabled, height, left, opacity, rotate, splitBlend, top, width]);

  useMotionValueEvent(scrollY, "change", updateFrame);

  useEffect(() => {
    updateFrame();
    window.addEventListener("resize", updateFrame);
    return () => window.removeEventListener("resize", updateFrame);
  }, [updateFrame]);

  if (!enabled) return null;

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

export function TeamScrollBridge({ children }: { children: ReactNode }) {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const bridgeEnabled = mounted && !prefersReducedMotion;
  const anchorRefs = useRef<Record<AnchorVariant, HTMLDivElement | null>>({
    hero: null,
    about: null,
  });

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
        <TeamScrollFlyLayer anchorRefs={anchorRefs} enabled={bridgeEnabled} />
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
