"use client";

import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query: string, onStoreChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

/**
 * SSR-safe media query. Server + first client snapshot use `ssrDefault`
 * so markup stays consistent; after hydration it reflects the real viewport.
 */
export function useMediaQuery(query: string, ssrDefault = false) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMediaQuery(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => ssrDefault,
  );
}
