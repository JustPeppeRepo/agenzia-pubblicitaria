"use client";

import { useEffect, useState, type RefObject } from "react";
import { useMotionSafe } from "@/hooks/use-motion-safe";

/**
 * Shared motion gate: CSS loops only when motion is allowed, the document
 * is visible, and (optionally) the observed root is in view.
 */
export function useHeroLive(rootRef?: RefObject<Element | null>) {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const [inView, setInView] = useState(true);
  const [docVisible, setDocVisible] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    function onVisibility() {
      setDocVisible(document.visibilityState === "visible");
    }
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    const el = rootRef?.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.05, rootMargin: "40px 0px" },
      );
      io.observe(el);
    } else {
      setInView(true);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, [mounted, rootRef]);

  return mounted && !prefersReducedMotion && inView && docVisible;
}
