"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { CornerBloom } from "@/components/decor/CornerBloom";

export function Hero() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden md:min-h-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-mesh"
      />
      <CornerBloom tone="accent" position="top-right" />
      <CornerBloom
        tone="spark"
        position="top-left"
        className="h-64 w-64 opacity-70 sm:h-72 sm:w-72"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 py-16 md:flex-row md:items-center md:gap-10 md:pb-32 md:pt-16">
        <div className="flex flex-1 flex-col items-center gap-10 text-center md:items-start md:text-left">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <motion.p
              initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-2"
            >
              {siteConfig.role}
            </motion.p>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {siteConfig.tagline}
            </h1>

            <motion.p
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/65 md:mx-0 md:text-xl"
            >
              {siteConfig.description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <Button href="/contact">Iniziamo un progetto</Button>
            <Button href="/#projects" variant="secondary">
              Vedi i progetti
            </Button>
          </motion.div>
        </div>

        {isMdUp ? (
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 40 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-full md:w-[420px] md:shrink-0 md:py-2"
          >
            <HeroVisual />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
