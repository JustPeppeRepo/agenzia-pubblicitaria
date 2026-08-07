"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import type { VisualProps } from "./shared";

export function SeoVisual({ animate }: VisualProps) {
  const [done, setDone] = useState(false);
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const reduced = mounted && prefersReducedMotion;
  const play = animate && !done && !reduced;
  // done resta true dopo il play: in uscita dalla viewport tiene il #1 finché non remounta
  const showFinal = done || reduced;
  const reactId = useId();
  const cardClipId = `seo-card-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    if (animate) setDone(false);
  }, [animate]);

  const slots = [54, 126, 166] as const;
  const climb = {
    duration: 3.4,
    ease: [0.45, 0, 0.15, 1] as const,
    times: [0, 0.14, 0.38, 0.62, 0.78, 1],
  };

  const card = { x: 66, y: 0, w: 210, h: 56, rx: 10 } as const;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <rect
        x="28"
        y="12"
        width="264"
        height="32"
        rx="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#0a0a0c]/65"
      />
      <circle cx="48" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="2" className="text-spark" />
      <path d="M53 33l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-spark" />
      <text
        x="66"
        y="32"
        fill="currentColor"
        fontSize="11"
        fontWeight="500"
        className="fill-foreground/80"
      >
        migliore negozio a Palermo
      </text>

      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <circle
            cx="44"
            cy={n === 1 ? slots[0] + 28 : slots[i] + 12}
            r={n === 1 ? 13 : 10}
            className={n === 1 ? "fill-spark" : "fill-foreground/20"}
          />
          <text
            x="44"
            y={n === 1 ? slots[0] + 33 : slots[i] + 16}
            textAnchor="middle"
            fill={n === 1 ? "#fff" : "currentColor"}
            fontSize={n === 1 ? 13 : 10}
            fontWeight="700"
            className={n === 1 ? undefined : "fill-foreground/70"}
          >
            {n}
          </text>
        </g>
      ))}

      <motion.g
        initial={false}
        animate={
          play
            ? { y: [slots[0], slots[0], slots[0], slots[1], slots[1], slots[1]] }
            : { y: showFinal ? slots[1] : slots[0] }
        }
        transition={climb}
        opacity={0.5}
      >
        <rect x="70" y="4" width="140" height="8" rx="3" className="fill-foreground/22" />
        <rect x="70" y="16" width="88" height="5" rx="2" className="fill-foreground/14" />
      </motion.g>

      <motion.g
        initial={false}
        animate={
          play
            ? { y: [slots[1], slots[1], slots[2], slots[2], slots[2], slots[2]] }
            : { y: showFinal ? slots[2] : slots[1] }
        }
        transition={climb}
        opacity={0.42}
      >
        <rect x="70" y="4" width="118" height="8" rx="3" className="fill-foreground/22" />
        <rect x="70" y="16" width="72" height="5" rx="2" className="fill-foreground/14" />
      </motion.g>

      <motion.g
        initial={false}
        animate={
          play
            ? { y: [slots[2], slots[2], slots[1], slots[0], slots[0], slots[0]] }
            : { y: showFinal ? slots[0] : slots[2] }
        }
        transition={climb}
        onAnimationComplete={() => {
          if (animate) setDone(true);
        }}
      >
        {/* Clip in local coords inside the animated group so accent tracks the card */}
        <defs>
          <clipPath id={cardClipId}>
            <rect
              x={card.x}
              y={card.y}
              width={card.w}
              height={card.h}
              rx={card.rx}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${cardClipId})`}>
          <rect
            x={card.x}
            y={card.y}
            width="5"
            height={card.h}
            className="fill-spark"
          />
        </g>
        <rect
          x={card.x}
          y={card.y}
          width={card.w}
          height={card.h}
          rx={card.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#0a0a0c]/55"
        />
        {/* Favicon */}
        <rect x="80" y="10" width="18" height="18" rx="4" className="fill-spark" />
        <path
          d="M85 19h8M89 15v8"
          stroke="#fff"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <text
          x="104"
          y="18"
          fill="currentColor"
          fontSize="11"
          fontWeight="700"
          className="fill-spark"
        >
          Negozio Rossi Palermo
        </text>
        <text
          x="104"
          y="30"
          fill="currentColor"
          fontSize="8.5"
          fontWeight="500"
          className="fill-spark/85"
        >
          www.tuosito.it
        </text>
        <text
          x="80"
          y="48"
          fill="currentColor"
          fontSize="8.5"
          className="fill-foreground/70"
        >
          Orari, mappa e recensioni del negozio.
        </text>
      </motion.g>
    </svg>
  );
}
