"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { PlainTalkVisualId } from "@/data/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";

export type VisualProps = { animate: boolean };

const pulse = {
  duration: 2.4,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

/** Visual one-shot: remount al rientro in viewport per rifare il play */
const REPLAY_ON_VIEW = new Set<PlainTalkVisualId>(["speed", "seo"]);

function useCanAnimate() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  return mounted && !prefersReducedMotion;
}

/**
 * Anima solo in viewport. Fuori schermo i loop si fermano (evita jank
 * quando PlainTalk ha più SVG motion attivi insieme).
 * Con remountOnEnter, al rientro incrementa cycle per ripartire da zero.
 */
function useInViewMotion(
  enabled: boolean,
  remountOnEnter = false,
): {
  ref: RefObject<HTMLDivElement | null>;
  active: boolean;
  cycle: number;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cycle, setCycle] = useState(0);
  const [active, setActive] = useState(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      inViewRef.current = false;
      setActive(false);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Enter: abbastanza visibile. Exit: quasi fuori (evita flicker su mobile).
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.28;
        const hidden =
          !entry.isIntersecting || entry.intersectionRatio < 0.06;

        if (visible && !inViewRef.current) {
          inViewRef.current = true;
          if (remountOnEnter) setCycle((c) => c + 1);
          setActive(true);
        } else if (hidden && inViewRef.current) {
          inViewRef.current = false;
          setActive(false);
        }
      },
      {
        threshold: [0, 0.06, 0.28, 0.45, 0.7],
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, remountOnEnter]);

  return { ref, active: enabled && active, cycle };
}

/** Soft opacity pulse — keeps geometry locked in place */
function Soft({
  animate,
  delay = 0,
  children,
  className,
}: {
  animate: boolean;
  delay?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.g
      className={className}
      initial={false}
      animate={animate ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.85 }}
      transition={animate ? { ...pulse, delay } : { duration: 0 }}
    >
      {children}
    </motion.g>
  );
}

/** Contenuto sito semplificato — scroll andata/ritorno, fase per-device */
function SiteScrollContent({
  x,
  screenY,
  width,
  animate,
  duration = 9.6,
  distance = 58,
  /** 0 = alto→basso, 0.5 = basso→alto, 0.25 = parte a metà corsa */
  phase = 0,
  layout,
}: {
  x: number;
  screenY: number;
  width: number;
  animate: boolean;
  duration?: number;
  distance?: number;
  phase?: 0 | 0.25 | 0.5;
  layout: "desktop" | "tablet" | "mobile";
}) {
  const pad = layout === "mobile" ? 5 : 6;
  const inner = width - pad * 2;
  const y0 = screenY;
  const mid = -distance / 2;
  const keyframes =
    phase === 0.5
      ? [-distance, 0, -distance]
      : phase === 0.25
        ? [mid, -distance, mid, 0, mid]
        : [0, -distance, 0];
  const times =
    phase === 0.25 ? [0, 0.25, 0.5, 0.75, 1] : [0, 0.5, 1];

  return (
    <motion.g
      initial={false}
      animate={animate ? { y: keyframes } : { y: 0 }}
      transition={
        animate
          ? {
              duration,
              ease: "easeInOut",
              times,
              repeat: Infinity,
            }
          : { duration: 0 }
      }
    >
      {/* Nav */}
      <rect x={x + pad} y={y0 + 4} width={inner} height={7} rx="2" className="fill-foreground/25" />
      <rect
        x={x + pad + 2}
        y={y0 + 6}
        width={layout === "mobile" ? 12 : 18}
        height={3}
        rx="1"
        className="fill-spark"
      />

      {/* Hero */}
      <rect
        x={x + pad}
        y={y0 + 14}
        width={inner}
        height={layout === "mobile" ? 20 : 16}
        rx="3"
        className="fill-spark/45"
      />

      {layout === "desktop" ? (
        <>
          <rect x={x + pad} y={y0 + 34} width={(inner - 4) / 2} height={14} rx="2" className="fill-foreground/22" />
          <rect x={x + pad + (inner - 4) / 2 + 4} y={y0 + 34} width={(inner - 4) / 2} height={14} rx="2" className="fill-foreground/16" />
          <rect x={x + pad} y={y0 + 52} width={inner} height={8} rx="2" className="fill-foreground/20" />
          <rect x={x + pad} y={y0 + 64} width={inner * 0.7} height={6} rx="2" className="fill-foreground/14" />
          <rect x={x + pad} y={y0 + 74} width={inner * 0.45} height={8} rx="3" className="fill-spark/65" />
          <rect x={x + pad} y={y0 + 88} width={inner} height={12} rx="2" className="fill-foreground/16" />
          <rect x={x + pad} y={y0 + 104} width={inner * 0.55} height={6} rx="2" className="fill-foreground/20" />
          <rect x={x + pad} y={y0 + 116} width={inner} height={10} rx="2" className="fill-foreground/14" />
        </>
      ) : layout === "tablet" ? (
        <>
          <rect x={x + pad} y={y0 + 34} width={inner} height={12} rx="2" className="fill-foreground/22" />
          <rect x={x + pad} y={y0 + 50} width={inner} height={12} rx="2" className="fill-foreground/16" />
          <rect x={x + pad} y={y0 + 66} width={inner * 0.55} height={8} rx="3" className="fill-spark/65" />
          <rect x={x + pad} y={y0 + 80} width={inner} height={10} rx="2" className="fill-foreground/16" />
          <rect x={x + pad} y={y0 + 94} width={inner * 0.7} height={6} rx="2" className="fill-foreground/20" />
          <rect x={x + pad} y={y0 + 106} width={inner} height={10} rx="2" className="fill-foreground/14" />
        </>
      ) : (
        <>
          <rect x={x + pad} y={y0 + 38} width={inner} height={10} rx="2" className="fill-foreground/22" />
          <rect x={x + pad} y={y0 + 52} width={inner} height={10} rx="2" className="fill-foreground/16" />
          <rect x={x + pad} y={y0 + 66} width={inner} height={10} rx="2" className="fill-foreground/20" />
          <rect x={x + pad} y={y0 + 80} width={inner} height={12} rx="3" className="fill-spark/65" />
          <rect x={x + pad} y={y0 + 96} width={inner * 0.75} height={6} rx="2" className="fill-foreground/14" />
          <rect x={x + pad} y={y0 + 108} width={inner} height={10} rx="2" className="fill-foreground/20" />
        </>
      )}
    </motion.g>
  );
}

export { Soft, SiteScrollContent, useCanAnimate, useInViewMotion, pulse, REPLAY_ON_VIEW };
