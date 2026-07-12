"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-36">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-foreground/50"
          >
            {siteConfig.role}
          </motion.p>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65 md:text-xl"
          >
            {siteConfig.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <Button href="/#projects">Vedi i progetti</Button>
          <Button href="/contact" variant="secondary">
            Iniziamo un progetto
          </Button>
        </motion.div>
      </div>

      {/* Decorative gradient orb */}
      <motion.div
        aria-hidden
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.04, 0.06, 0.04] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
      />
    </section>
  );
}
