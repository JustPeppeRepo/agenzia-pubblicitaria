"use client";

import { motion } from "framer-motion";
import { Soft, type VisualProps } from "./shared";

export function ScaleVisual({ animate }: VisualProps) {
  const cycle = 6.2;
  const core = { x: 108, y: 52, w: 104, h: 92 };
  const coreCx = core.x + core.w / 2;
  const coreCy = core.y + core.h / 2;

  const modules = [
    {
      id: "traffic",
      x: 16,
      y: 12,
      label: "Traffico",
      ox: -18,
      oy: -14,
      delay: 0.15,
      icon: "users" as const,
    },
    {
      id: "content",
      x: 232,
      y: 12,
      label: "Contenuti",
      ox: 18,
      oy: -14,
      delay: 0.45,
      icon: "docs" as const,
    },
    {
      id: "features",
      x: 16,
      y: 144,
      label: "Funzioni",
      ox: -18,
      oy: 14,
      delay: 0.75,
      icon: "plus" as const,
    },
    {
      id: "api",
      x: 232,
      y: 144,
      label: "Integrazioni",
      ox: 18,
      oy: 14,
      delay: 1.05,
      icon: "nodes" as const,
    },
  ];

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full overflow-visible" aria-hidden>
      {/* Anelli di capacità che respirano attorno al nucleo */}
      <Soft animate={animate} delay={0.2}>
        <circle
          cx={coreCx}
          cy={coreCy}
          r={68}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 6"
          className="text-spark/55"
        />
      </Soft>
      <motion.circle
        cx={coreCx}
        cy={coreCy}
        r={84}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-spark/40"
        initial={false}
        animate={animate ? { opacity: [0.2, 0.55, 0.2] } : { opacity: 0.35 }}
        transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Moduli che si agganciano */}
      {modules.map((m) => (
        <motion.g
          key={m.id}
          initial={false}
          animate={
            animate
              ? {
                  x: [m.ox, 0, 0, m.ox * 0.3],
                  y: [m.oy, 0, 0, m.oy * 0.3],
                  opacity: [0, 1, 1, 0],
                }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{
            duration: cycle,
            delay: m.delay,
            times: [0, 0.18, 0.78, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <rect
            x={m.x}
            y={m.y}
            width="72"
            height="44"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="text-[#0a0a0c]/45"
          />
          <rect
            x={m.x}
            y={m.y}
            width="72"
            height="44"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#0a0a0c]/65"
          />

          {m.icon === "users" && (
            <g className="text-spark" stroke="currentColor" fill="none" strokeWidth="1.5">
              <circle cx={m.x + 32} cy={m.y + 13} r="3.5" />
              <path d={`M${m.x + 25} ${m.y + 23}c1.2-4 4-5.5 7-5.5s5.8 1.5 7 5.5`} strokeLinecap="round" />
              <circle cx={m.x + 43} cy={m.y + 14} r="2.8" opacity="0.65" />
            </g>
          )}
          {m.icon === "docs" && (
            <g className="text-spark" stroke="currentColor" fill="none" strokeWidth="1.5">
              <rect x={m.x + 29} y={m.y + 8} width="14" height="16" rx="2" />
              <path d={`M${m.x + 32} ${m.y + 13}h8M${m.x + 32} ${m.y + 17}h8M${m.x + 32} ${m.y + 21}h5`} strokeLinecap="round" />
            </g>
          )}
          {m.icon === "plus" && (
            <g className="text-spark" stroke="currentColor" fill="none" strokeWidth="1.75">
              <rect x={m.x + 28} y={m.y + 8} width="16" height="16" rx="4" />
              <path d={`M${m.x + 36} ${m.y + 12}v8M${m.x + 32} ${m.y + 16}h8`} strokeLinecap="round" />
            </g>
          )}
          {m.icon === "nodes" && (
            <g className="text-spark" stroke="currentColor" fill="none" strokeWidth="1.5">
              <circle cx={m.x + 29} cy={m.y + 11} r="3" />
              <circle cx={m.x + 43} cy={m.y + 11} r="3" />
              <circle cx={m.x + 36} cy={m.y + 21} r="3" />
              <path d={`M${m.x + 31.5} ${m.y + 13}L${m.x + 34} ${m.y + 18.5}M${m.x + 40.5} ${m.y + 13}L${m.x + 38} ${m.y + 18.5}`} />
            </g>
          )}

          <text
            x={m.x + 36}
            y={m.y + 36}
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontWeight="700"
            className="fill-foreground/60"
          >
            {m.label}
          </text>
        </motion.g>
      ))}

      {/* Nucleo sopra linee e particelle */}
      <g>
        <rect
          x={core.x}
          y={core.y}
          width={core.w}
          height={core.h}
          rx="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[#0a0a0c]/65"
        />
        <circle cx={core.x + 14} cy={core.y + 14} r="3" className="fill-foreground/45" />
        <circle cx={core.x + 24} cy={core.y + 14} r="3" className="fill-foreground/45" />
        <circle cx={core.x + 34} cy={core.y + 14} r="3" className="fill-foreground/45" />
        <rect
          x={core.x + 12}
          y={core.y + 28}
          width={core.w - 24}
          height={7}
          rx="2.5"
          className="fill-spark"
        />
        <rect
          x={core.x + 12}
          y={core.y + 42}
          width={core.w - 36}
          height={5}
          rx="2"
          className="fill-foreground/25"
        />
        <rect
          x={core.x + 12}
          y={core.y + 52}
          width={core.w - 48}
          height={5}
          rx="2"
          className="fill-foreground/16"
        />
        <text
          x={coreCx}
          y={core.y + 76}
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.1em"
          className="fill-spark"
        >
          SITO
        </text>
      </g>

    </svg>
  );
}
