"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { aboutMembers, aboutTeam } from "@/data/site";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useScrollBridgeEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return enabled;
}

type AnchorVariant = "hero" | "about";

type TeamScrollContextValue = {
  registerAnchor: (variant: AnchorVariant, element: HTMLDivElement | null) => void;
  isBridgeActive: boolean;
  anchorVersion: number;
};

const TeamScrollContext = createContext<TeamScrollContextValue | null>(null);

type FrameRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

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

  // progress 0 at page top, 1 once we've scrolled the distance between anchors
  return clamp(window.scrollY / distance, 0, 1);
}

function TeamImageFrame({
  splitBlend,
  className,
}: {
  splitBlend: number;
  className?: string;
}) {
  const togetherOpacity = 1 - splitBlend;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={aboutTeam.image}
        alt=""
        aria-hidden
        width={400}
        height={520}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: togetherOpacity }}
      />
      <div
        className="absolute inset-0 flex"
        style={{ opacity: splitBlend }}
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
    </div>
  );
}

type TeamScrollFlyLayerProps = {
  anchorRefs: React.MutableRefObject<Record<AnchorVariant, HTMLDivElement | null>>;
  anchorVersion: number;
};

function TeamScrollFlyLayer({ anchorRefs, anchorVersion }: TeamScrollFlyLayerProps) {
  const [progress, setProgress] = useState(0);
  const [rect, setRect] = useState<FrameRect | null>(null);
  const isBridgeActive = useScrollBridgeEnabled();

  const updateFrame = useCallback(() => {
    const hero = anchorRefs.current.hero;
    const about = anchorRefs.current.about;
    if (!hero || !about) return;

    const nextProgress = computeProgress(hero, about);

    hero.style.opacity = String(getAnchorOpacity(nextProgress, "hero"));
    about.style.opacity = String(getAnchorOpacity(nextProgress, "about"));
    setProgress(nextProgress);

    const heroRect = hero.getBoundingClientRect();
    const aboutRect = about.getBoundingClientRect();

    setRect(
      interpolateRect(
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
        nextProgress,
      ),
    );
  }, [anchorRefs, anchorVersion]);

  useLayoutEffect(() => {
    if (!isBridgeActive) return;
    updateFrame();
  }, [anchorVersion, isBridgeActive, updateFrame]);

  useEffect(() => {
    if (!isBridgeActive) {
      if (anchorRefs.current.hero) anchorRefs.current.hero.style.opacity = "1";
      if (anchorRefs.current.about) anchorRefs.current.about.style.opacity = "1";
      return;
    }

    updateFrame();

    let frame = 0;
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFrame);
    };

    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (anchorRefs.current.hero) anchorRefs.current.hero.style.opacity = "1";
      if (anchorRefs.current.about) anchorRefs.current.about.style.opacity = "1";
    };
  }, [anchorRefs, anchorVersion, isBridgeActive, updateFrame]);

  if (!isBridgeActive) return null;

  const splitBlend = getSplitBlend(progress);
  const flyOpacity = getFlyOpacity(progress);

  if (!rect || flyOpacity <= 0) return null;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed z-40 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] shadow-lg shadow-foreground/10"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        opacity: flyOpacity,
        transform: `rotate(${(progress - 0.5) * -3}deg)`,
      }}
    >
      <TeamImageFrame splitBlend={splitBlend} />
    </div>,
    document.body,
  );
}

export function TeamScrollBridge({ children }: { children: ReactNode }) {
  const isBridgeActive = useScrollBridgeEnabled();
  const anchorRefs = useRef<Record<AnchorVariant, HTMLDivElement | null>>({
    hero: null,
    about: null,
  });
  const [anchorVersion, setAnchorVersion] = useState(0);

  const registerAnchor = useCallback(
    (variant: AnchorVariant, element: HTMLDivElement | null) => {
      if (anchorRefs.current[variant] === element) return;
      anchorRefs.current[variant] = element;
      setAnchorVersion((version) => version + 1);
    },
    [],
  );

  return (
    <TeamScrollContext.Provider value={{ registerAnchor, isBridgeActive, anchorVersion }}>
      {children}
      <TeamScrollFlyLayer anchorRefs={anchorRefs} anchorVersion={anchorVersion} />
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
    [context?.registerAnchor, variant],
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
