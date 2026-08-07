"use client";

import { motion } from "framer-motion";
import { Soft, type VisualProps } from "./shared";

export function SecurityVisual({ animate }: VisualProps) {
  const threats = [
    { x: 52, y: 44, dx: 68, dy: 40 },
    { x: 268, y: 44, dx: -68, dy: 40 },
    { x: 52, y: 148, dx: 68, dy: -36 },
    { x: 268, y: 148, dx: -68, dy: -36 },
  ];
  // Ciclo più lungo + stagger uniforme → onda continua senza scatti
  const cycle = 5.2;
  const stagger = cycle / threats.length;
  const fluid = [0.4, 0.0, 0.2, 1] as const;
  const breath = [0.45, 0.05, 0.55, 0.95] as const;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <motion.g
        initial={false}
        animate={
          animate
            ? { y: [0, -3.5, 0, -2, 0], scale: [1, 1.015, 1, 1.01, 1] }
            : { y: 0, scale: 1 }
        }
        transition={{
          duration: 5,
          ease: breath,
          times: [0, 0.28, 0.55, 0.78, 1],
          repeat: Infinity,
        }}
        style={{ transformOrigin: "160px 100px" }}
      >
        <path
          d="M160 36l44 18v30c0 28-18 48-44 56-26-8-44-28-44-56V54l44-18z"
          stroke="currentColor"
          strokeWidth="2.25"
          className="fill-spark text-[#0a0a0c]/65"
        />
        <path
          d="M146 100l10 10 18-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
      </motion.g>

      {threats.map((t, i) => (
        <g key={i}>
          {/* Flash d’impatto — fade morbido, niente picco secco */}
          <motion.circle
            cx={t.x + t.dx}
            cy={t.y + t.dy}
            r={18}
            className="fill-red-500/60"
            initial={false}
            animate={
              animate
                ? {
                    opacity: [0, 0, 0.15, 0.55, 0.25, 0],
                    scale: [0.7, 0.7, 0.95, 1.2, 1.35, 1.45],
                  }
                : { opacity: 0, scale: 1 }
            }
            transition={{
              duration: cycle,
              delay: i * stagger,
              times: [0, 0.38, 0.48, 0.55, 0.7, 1],
              ease: fluid,
              repeat: Infinity,
            }}
            style={{ transformOrigin: `${t.x + t.dx}px ${t.y + t.dy}px` }}
          />

          <motion.g
            initial={false}
            animate={
              animate
                ? {
                    x: [0, t.dx * 0.22, t.dx, t.dx * 0.88, t.dx * 0.35, 0],
                    y: [0, t.dy * 0.22, t.dy, t.dy * 0.88, t.dy * 0.35, 0],
                    opacity: [0.3, 0.65, 1, 0.9, 0.45, 0.3],
                    scale: [0.9, 0.96, 1, 0.98, 0.93, 0.9],
                  }
                : { x: 0, y: 0, opacity: 1, scale: 1 }
            }
            transition={{
              duration: cycle,
              delay: i * stagger,
              // Approccio lento → contatto → rimbalzo soft → rientro sfumato
              times: [0, 0.22, 0.52, 0.6, 0.78, 1],
              ease: fluid,
              repeat: Infinity,
            }}
            style={{ transformOrigin: `${t.x}px ${t.y}px` }}
          >
            <circle
              cx={t.x}
              cy={t.y}
              r={14}
              className="fill-red-600"
            />
            <circle
              cx={t.x}
              cy={t.y}
              r={14}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#0a0a0c]/65"
            />
            <path
              d={`M${t.x - 4.5} ${t.y - 4.5}l9 9M${t.x + 4.5} ${t.y - 4.5}l-9 9`}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-white/90"
            />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

