"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSafe } from "@/hooks/use-motion-safe";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

const directionOffset = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const offset = directionOffset[direction];
  const branch = prefersReducedMotion ? "plain-div" : "motion-div";

  // #region agent log
  fetch("http://127.0.0.1:7629/ingest/fce1f9bb-7552-4c72-bb27-bee1e2496594", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "42293a",
    },
    body: JSON.stringify({
      sessionId: "42293a",
      location: "FadeIn.tsx:render",
      message: "FadeIn render",
      data: {
        mounted,
        prefersReducedMotion,
        branch,
        isServer: typeof window === "undefined",
      },
      timestamp: Date.now(),
      hypothesisId: "B-C",
      runId: "post-fix",
    }),
  }).catch(() => {});
  // #endregion

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7629/ingest/fce1f9bb-7552-4c72-bb27-bee1e2496594", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "42293a",
      },
      body: JSON.stringify({
        sessionId: "42293a",
        location: "FadeIn.tsx:useEffect",
        message: "FadeIn post-hydration",
        data: {
          mounted,
          prefersReducedMotion,
          branch,
          matchMedia: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches,
        },
        timestamp: Date.now(),
        hypothesisId: "B",
        runId: "post-fix",
      }),
    }).catch(() => {});
    // #endregion
  }, [mounted, prefersReducedMotion, branch]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
  const { prefersReducedMotion } = useMotionSafe();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

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
  const { prefersReducedMotion } = useMotionSafe();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
