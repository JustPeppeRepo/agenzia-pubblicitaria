"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, ENTRANCE_TRANSITION } from "@/components/motion/easing";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /**
   * Near-fold content (e.g. AboutBrief under hero): keep opacity visible for
   * LCP/paint while still sliding in — avoids opacity:0 on content already
   * intersecting the viewport.
   */
  nearFold?: boolean;
};

const directionOffset = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll entrance wrapper. Keep `initial` stable (never gate on `mounted`)
 * so hydration → mount never snaps visible → hidden → animate.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  nearFold = false,
}: FadeInProps) {
  const offset = directionOffset[direction];
  const y = nearFold ? Math.round((offset.y ?? 0) * 0.5) : offset.y;
  const x = nearFold ? Math.round((offset.x ?? 0) * 0.5) : offset.x;

  return (
    <motion.div
      className={className}
      initial={
        nearFold
          ? { opacity: 1, x, y }
          : { opacity: 0, ...offset }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once: true,
        margin: nearFold ? "0px" : "-80px",
      }}
      transition={{ ...ENTRANCE_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...ENTRANCE_TRANSITION, duration: 0.5, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
