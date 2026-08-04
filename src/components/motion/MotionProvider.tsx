"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/easing";

/**
 * Global motion defaults: tween + easeOut for fluid entrances,
 * and OS prefers-reduced-motion without remounting / flipping `initial`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "tween", ease: EASE_OUT, duration: 0.55 }}
    >
      {children}
    </MotionConfig>
  );
}
