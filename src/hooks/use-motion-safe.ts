"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * SSR-safe motion preferences. During SSR and the first client render,
 * returns prefersReducedMotion=true so server HTML matches hydration.
 * After mount, reflects the real OS prefers-reduced-motion setting.
 */
export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeReducedMotion = !mounted || Boolean(prefersReducedMotion);

  return { mounted, prefersReducedMotion: safeReducedMotion };
}
