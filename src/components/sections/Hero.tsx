"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { TeamImageAnchor } from "@/components/sections/TeamScrollBridge";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { CornerBloom } from "@/components/decor/CornerBloom";

export function Hero() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <section className="relative overflow-hidden">
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

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-12 pb-24 md:flex-row md:items-center md:gap-10 md:pt-16 md:pb-32">
        <div className="flex flex-1 flex-col gap-10">
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
              className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65 md:text-xl"
            >
              {siteConfig.description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/contact">Iniziamo un progetto</Button>
            <Button href="/#projects" variant="secondary">
              Vedi i progetti
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, x: 40 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full md:w-[360px] md:shrink-0 md:py-2"
        >
          <TeamImageAnchor variant="hero" priority />
        </motion.div>
      </div>
    </section>
  );
}
