"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroVisual = dynamic(
  () =>
    import("@/components/sections/HeroVisual").then((m) => m.HeroVisual),
  { ssr: false, loading: () => null },
);

/**
 * Desktop-only hero rail. Keeps HeroVisual out of the mobile JS graph
 * and out of the initial SSR document.
 */
export function HeroVisualSlot() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isMdUp) return null;

  return (
    <div className="hidden w-full md:block md:w-[420px] md:shrink-0 md:py-2">
      <HeroVisual />
    </div>
  );
}
