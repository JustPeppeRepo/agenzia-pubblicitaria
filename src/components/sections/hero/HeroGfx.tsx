"use client";

import { useMotionSafe } from "@/hooks/use-motion-safe";

/**
 * Shared motion gate: CSS loops only when motion is allowed.
 */
export function useHeroLive() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  return mounted && !prefersReducedMotion;
}
