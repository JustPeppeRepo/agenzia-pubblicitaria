"use client";

import { motion } from "framer-motion";
import { comparisonPlainTalk, type PlainTalkVisualId } from "@/data/site";
import { LayeredWaves } from "@/components/decor/LayeredWaves";
import { EASE_OUT, ENTRANCE_TRANSITION } from "@/components/motion/easing";
import { FadeIn } from "@/components/motion/FadeIn";
import { PlainTalkVisual } from "@/components/sections/PlainTalkVisual";
import { BioText } from "@/components/ui/BioText";
import { cn } from "@/lib/utils";

type RowProps = {
  index: number;
  title: string;
  text: string;
  visual: PlainTalkVisualId;
};

function PlainTalkRow({ index, title, text, visual }: RowProps) {
  const textFirst = index % 2 === 1;

  return (
    <motion.div
      className={cn(
        "mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-2 md:gap-12 lg:gap-16",
        textFirst && "md:[&>*:first-child]:order-2",
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...ENTRANCE_TRANSITION, ease: EASE_OUT }}
    >
      <div className={cn(textFirst ? "md:text-right" : "md:text-left")}>
        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8",
            textFirst && "md:ml-auto",
          )}
        >
          <BioText text={text} />
        </p>
      </div>

      <div
        className={cn(
          "relative flex justify-center",
          textFirst ? "md:justify-start" : "md:justify-end",
        )}
      >
        <PlainTalkVisual id={visual} />
      </div>
    </motion.div>
  );
}

export function PlainTalk() {
  const {
    eyebrow,
    title,
    intro,
    offerBlocks,
    glossaryBlocks,
  } = comparisonPlainTalk;

  let rowIndex = 0;

  return (
    <section className="relative mt-2 w-full overflow-hidden">
      {/* Zona onde trasparente — niente fill sezione dietro */}
      <LayeredWaves
        placement="top"
        from="background"
        to="warm"
        className="relative z-10"
      />

      <div className="bg-warm-wash relative -mt-10 sm:-mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
        />

        <div className="relative py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#b45309] dark:text-spark">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/65 sm:text-lg">
              {intro}
            </p>
          </FadeIn>

          <div className="mt-14 space-y-16 sm:space-y-20">
            {offerBlocks.map((block) => {
              const index = rowIndex++;
              return (
                <PlainTalkRow
                  key={block.id}
                  index={index}
                  title={block.title}
                  text={block.text}
                  visual={block.visual}
                />
              );
            })}
          </div>

          <div className="mt-16 space-y-16 sm:space-y-20">
            {glossaryBlocks.map((block) => {
              const index = rowIndex++;
              return (
                <PlainTalkRow
                  key={block.id}
                  index={index}
                  title={block.term}
                  text={block.text}
                  visual={block.visual}
                />
              );
            })}
          </div>
        </div>
      </div>

      <LayeredWaves
        placement="bottom"
        from="background"
        to="warm"
        className="relative z-10 -mt-10 sm:-mt-12"
      />
    </section>
  );
}
