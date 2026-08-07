"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useSyncExternalStore } from "react";

const MD_QUERY = "(min-width: 768px)";

function subscribeMd(onStoreChange: () => void) {
  const mq = window.matchMedia(MD_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMdSnapshot() {
  return window.matchMedia(MD_QUERY).matches;
}

function getServerMdSnapshot() {
  return false;
}

/**
 * Loads the product mockup JS only on md+ viewports. Placeholder reserves
 * height to avoid CLS when the chunk mounts after hydration.
 */
export function HeroMockupDeferred() {
  const isMd = useSyncExternalStore(subscribeMd, getMdSnapshot, getServerMdSnapshot);
  const [Mockup, setMockup] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!isMd) {
      setMockup(null);
      return;
    }

    let cancelled = false;
    void import("@/components/sections/hero/HeroProductMockup").then((mod) => {
      if (!cancelled) setMockup(() => mod.HeroProductMockup);
    });

    return () => {
      cancelled = true;
    };
  }, [isMd]);

  if (!isMd) return null;

  if (!Mockup) {
    return (
      <div
        className="mx-auto w-full max-w-[440px] min-h-[22rem] md:max-w-none md:min-h-[26rem]"
        aria-hidden
      />
    );
  }

  return <Mockup />;
}
