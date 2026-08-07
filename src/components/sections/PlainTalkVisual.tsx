"use client";

import {
  useEffect,
  useState,
  type ComponentType,
} from "react";
import type { PlainTalkVisualId } from "@/data/site";
import {
  REPLAY_ON_VIEW,
  useCanAnimate,
  useInViewMotion,
  type VisualProps,
} from "@/components/sections/plain-talk-visuals/shared";
import { cn } from "@/lib/utils";

type PlainTalkVisualProps = {
  id: PlainTalkVisualId;
  className?: string;
};

const LABELS: Record<PlainTalkVisualId, string> = {
  responsive: "Illustrazione: stesso sito su desktop, tablet e smartphone",
  speed: "Illustrazione: score di performance e Core Web Vitals",
  security: "Illustrazione: scudo che protegge il sito",
  seo: "Illustrazione: il sito sale dal terzo al primo posto nei risultati di ricerca",
  scale: "Illustrazione: il nucleo del sito resta solido mentre si agganciano nuovi moduli",
};

const LOADERS: Record<
  PlainTalkVisualId,
  () => Promise<{ default: ComponentType<VisualProps> }>
> = {
  responsive: () =>
    import("./plain-talk-visuals/ResponsiveVisual").then((m) => ({
      default: m.ResponsiveVisual,
    })),
  speed: () =>
    import("./plain-talk-visuals/SpeedVisual").then((m) => ({
      default: m.SpeedVisual,
    })),
  security: () =>
    import("./plain-talk-visuals/SecurityVisual").then((m) => ({
      default: m.SecurityVisual,
    })),
  seo: () =>
    import("./plain-talk-visuals/SeoVisual").then((m) => ({
      default: m.SeoVisual,
    })),
  scale: () =>
    import("./plain-talk-visuals/ScaleVisual").then((m) => ({
      default: m.ScaleVisual,
    })),
};

export function PlainTalkVisual({ id, className }: PlainTalkVisualProps) {
  const canAnimate = useCanAnimate();
  const remountOnEnter = REPLAY_ON_VIEW.has(id);
  const { ref, active, cycle } = useInViewMotion(canAnimate, remountOnEnter);
  const [Visual, setVisual] = useState<ComponentType<VisualProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void LOADERS[id]().then((mod) => {
      if (!cancelled) setVisual(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full max-w-80 items-center justify-center text-foreground",
        className,
      )}
      role="img"
      aria-label={LABELS[id]}
    >
      {Visual ? (
        <Visual key={remountOnEnter ? cycle : id} animate={active} />
      ) : (
        <div className="aspect-square w-full max-w-80" aria-hidden />
      )}
    </div>
  );
}
