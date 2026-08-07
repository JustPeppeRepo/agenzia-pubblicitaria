"use client";

import { animate as motionAnimate, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Soft, type VisualProps } from "./shared";

const SCORE_EASE = [0.22, 1, 0.36, 1] as const;
const SCORE_DURATION = 1.6;

export function ScoreRing({
  cx,
  cy,
  r,
  score,
  animate,
  delay = 0,
  strokeWidth = 7,
}: {
  cx: number;
  cy: number;
  r: number;
  score: number;
  animate: boolean;
  delay?: number;
  strokeWidth?: number;
}) {
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-[#0a0a0c]/40"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={c}
        className="text-spark"
        transform={`rotate(-90 ${cx} ${cy})`}
        initial={false}
        animate={{ strokeDashoffset: animate ? [c, offset] : offset }}
        transition={
          animate
            ? { duration: SCORE_DURATION, delay, ease: SCORE_EASE }
            : { duration: 0 }
        }
      />
    </g>
  );
}

/** Numero performance che conta da 0 allo score */
function ScoreCount({
  score,
  animate,
  delay = 0,
  x,
  y,
}: {
  score: number;
  animate: boolean;
  delay?: number;
  x: number;
  y: number;
}) {
  const [value, setValue] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setValue(score);
      return;
    }

    setValue(0);
    const controls = motionAnimate(0, score, {
      duration: SCORE_DURATION,
      delay,
      ease: SCORE_EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [animate, score, delay]);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="currentColor"
      fontSize="28"
      fontWeight="700"
      className="fill-foreground"
    >
      {value}
    </text>
  );
}

/** Metriche Core Web Vitals in stile Speed Insights */
export function SpeedVisual({ animate }: VisualProps) {
  const metrics = [
    { label: "LCP", value: "1.1s", hint: "Good" },
    { label: "INP", value: "48ms", hint: "Good" },
    { label: "CLS", value: "0.02", hint: "Good" },
  ] as const;

  const cardX = 168;
  const cardW = 120;

  return (
    <svg
      viewBox="0 0 320 200"
      className="h-auto w-full overflow-visible"
      aria-hidden
    >
      {/* Panel — solo bordo, senza contenitore pieno */}
      <rect
        x="16"
        y="12"
        width="288"
        height="176"
        rx="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#0a0a0c]/65"
      />

      {/* Header */}
      <text
        x="36"
        y="40"
        fill="currentColor"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.06em"
        className="fill-foreground/70"
      >
        SPEED INSIGHTS
      </text>
      <Soft animate={animate} delay={0.4}>
        <circle cx="276" cy="34" r="4" className="fill-spark" />
        <circle cx="276" cy="34" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-spark/70" />
      </Soft>

      {/* Main Performance score */}
      <ScoreRing cx={96} cy={112} r={44} score={100} animate={animate} strokeWidth={8} />
      <ScoreCount score={100} animate={animate} x={96} y={108} />
      <text
        x="96"
        y="128"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        className="fill-foreground/70"
      >
        Performance
      </text>

      {/* Side vitals */}
      {metrics.map((m, i) => {
        const y = 58 + i * 40;
        return (
          <g key={m.label}>
            <rect
              x={cardX}
              y={y}
              width={cardW}
              height={34}
              rx="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#0a0a0c]/55"
            />
            <Soft animate={animate} delay={0.2 + i * 0.12}>
              <circle cx={cardX + 14} cy={y + 17} r="4" className="fill-spark" />
            </Soft>
            <text
              x={cardX + 28}
              y={y + 14}
              fill="currentColor"
              fontSize="10"
              fontWeight="600"
              className="fill-foreground/80"
            >
              {m.label}
            </text>
            <text
              x={cardX + 28}
              y={y + 28}
              fill="currentColor"
              fontSize="12"
              fontWeight="700"
              className="fill-spark"
            >
              {m.value}
            </text>
            <text
              x={cardX + cardW - 12}
              y={y + 20}
              textAnchor="end"
              fill="currentColor"
              fontSize="9"
              className="fill-spark/85"
            >
              {m.hint}
            </text>
          </g>
        );
      })}

      {/* Fulmine grande, obliquo, sovrapposto al bordo destro */}
      <g transform="translate(308 100)">
        <motion.g
          initial={false}
          animate={
            animate
              ? {
                  rotate: [12, 18, 12],
                  y: [0, -3, 0],
                  opacity: [0.75, 1, 0.75],
                }
              : { rotate: 14, y: 0, opacity: 0.9 }
          }
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <path
            d="M10 -72 L-30 2 H-6 L-22 72 L30 -12 H2 Z"
            className="fill-spark"
          />
        </motion.g>
      </g>
    </svg>
  );
}

