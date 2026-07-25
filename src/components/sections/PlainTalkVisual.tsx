"use client";

import { motion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";
import type { PlainTalkVisualId } from "@/data/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { cn } from "@/lib/utils";

type PlainTalkVisualProps = {
  id: PlainTalkVisualId;
  className?: string;
};

type VisualProps = { animate: boolean };

const pulse = {
  duration: 2.4,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

function useCanAnimate() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  return mounted && !prefersReducedMotion;
}

/** Soft opacity pulse — keeps geometry locked in place */
function Soft({
  animate,
  delay = 0,
  children,
  className,
}: {
  animate: boolean;
  delay?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.g
      className={className}
      initial={false}
      animate={animate ? { opacity: [0.55, 1, 0.55] } : undefined}
      transition={{ ...pulse, delay }}
    >
      {children}
    </motion.g>
  );
}

/** Sito → contatto, tutto su una riga orizzontale allineata */
function ClientsVisual({ animate }: VisualProps) {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      {/* Browser */}
      <rect x="24" y="40" width="120" height="96" rx="10" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground/25" />
      <circle cx="40" cy="56" r="3" className="fill-foreground/20" />
      <circle cx="52" cy="56" r="3" className="fill-foreground/20" />
      <circle cx="64" cy="56" r="3" className="fill-foreground/20" />
      <rect x="78" y="51" width="50" height="8" rx="4" className="fill-foreground/10" />
      <Soft animate={animate}>
        <rect x="40" y="72" width="88" height="10" rx="3" className="fill-emerald-500/70" />
      </Soft>
      <rect x="40" y="90" width="64" height="6" rx="2" className="fill-foreground/12" />
      <rect x="40" y="104" width="76" height="6" rx="2" className="fill-foreground/10" />
      <rect x="40" y="116" width="44" height="10" rx="5" className="fill-emerald-500/80" />

      {/* Connector — horizontal centerline y=88 */}
      <Soft animate={animate} delay={0.2}>
        <path d="M152 88h40" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-emerald-500/45" />
        <path d="M184 82l8 6-8 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/55" />
      </Soft>

      {/* Contact card — aligned to same vertical band */}
      <rect x="200" y="56" width="96" height="64" rx="10" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-emerald-500/55" />
      <circle cx="224" cy="80" r="8" className="fill-emerald-500/65" />
      <rect x="240" y="74" width="40" height="5" rx="2" className="fill-foreground/18" />
      <rect x="240" y="84" width="28" height="4" rx="2" className="fill-foreground/12" />
      <Soft animate={animate} delay={0.35}>
        <path d="M216 104l6 6 12-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" />
      </Soft>

      {/* Visitors row — evenly spaced on baseline */}
      {[0, 1, 2].map((i) => (
        <Soft key={i} animate={animate} delay={0.1 * i}>
          <circle cx={56 + i * 36} cy={168} r="7" className="fill-emerald-500/50" />
          <path d={`M${56 + i * 36} 175v10`} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-emerald-500/35" />
        </Soft>
      ))}
    </svg>
  );
}

/** Due pannelli simmetrici + cliente al centro sotto */
function AlignedVisual({ animate }: VisualProps) {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      {/* Left: code */}
      <rect x="28" y="28" width="100" height="88" rx="12" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground/28" />
      <path d="M48 56l-8 16 8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40" />
      <path d="M108 56l8 16-8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40" />
      <Soft animate={animate}>
        <rect x="58" y="68" width="40" height="8" rx="3" className="fill-emerald-500/65" />
      </Soft>

      {/* Right: megaphone — mirror box */}
      <rect x="192" y="28" width="100" height="88" rx="12" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-emerald-500/50" />
      <path d="M216 56h20l24-12v56l-24-12h-20z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" className="text-emerald-500/70" />
      <Soft animate={animate} delay={0.2}>
        <path d="M264 60c8 8 8 32 0 40" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-emerald-500/40" />
      </Soft>

      {/* Center bridge */}
      <Soft animate={animate} delay={0.1}>
        <path d="M128 72h64" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-emerald-500/50" />
      </Soft>

      {/* Customer — centered under bridge */}
      <circle cx="160" cy="156" r="20" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-emerald-500/45" />
      <circle cx="160" cy="148" r="7" className="fill-emerald-500/60" />
      <path d="M146 170c5-8 23-8 28 0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-emerald-500/50" />
    </svg>
  );
}

/** Griglia 3×2 di moduli, tutti stessa misura */
function GrowVisual({ animate }: VisualProps) {
  const cells = [
    { x: 36, y: 36, label: "Home" },
    { x: 124, y: 36, label: "Blog" },
    { x: 212, y: 36, label: "Shop" },
    { x: 36, y: 100, label: "App" },
    { x: 124, y: 100, label: "CRM" },
    { x: 212, y: 100, label: "API" },
  ];

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      {cells.map((c, i) => (
        <Soft key={c.label} animate={animate} delay={i * 0.08}>
          <rect
            x={c.x}
            y={c.y}
            width="72"
            height="48"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="text-emerald-500/50"
          />
          <text
            x={c.x + 36}
            y={c.y + 28}
            textAnchor="middle"
            fill="currentColor"
            fontSize="11"
            className="fill-foreground/50"
          >
            {c.label}
          </text>
        </Soft>
      ))}
      <rect x="36" y="168" width="248" height="10" rx="5" className="fill-foreground/10" />
      <Soft animate={animate} delay={0.15}>
        <rect x="36" y="168" width="248" height="10" rx="5" className="fill-emerald-500/35" />
      </Soft>
    </svg>
  );
}

/** Due telefoni identici, allineati; contrasto solo nel contenuto */
function SpeedVisual({ animate }: VisualProps) {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      {/* Slow */}
      <rect x="48" y="24" width="84" height="140" rx="14" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-rose-500/45" />
      <rect x="60" y="40" width="60" height="100" rx="6" className="fill-foreground/5" />
      <Soft animate={animate}>
        <circle cx="90" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="12 8" className="text-rose-500/65" />
      </Soft>
      <text x="90" y="184" textAnchor="middle" fill="currentColor" fontSize="10" className="fill-rose-600/65">
        lento
      </text>

      {/* Fast — same geometry, mirrored x */}
      <rect x="188" y="24" width="84" height="140" rx="14" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-emerald-500/55" />
      <rect x="200" y="40" width="60" height="100" rx="6" className="fill-emerald-500/6" />
      <Soft animate={animate} delay={0.15}>
        <rect x="210" y="56" width="40" height="8" rx="3" className="fill-emerald-500/75" />
      </Soft>
      <rect x="210" y="72" width="28" height="5" rx="2" className="fill-foreground/12" />
      <rect x="210" y="84" width="34" height="5" rx="2" className="fill-foreground/10" />
      <path d="M218 112l8 8 14-16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" />
      <text x="230" y="184" textAnchor="middle" fill="currentColor" fontSize="10" className="fill-emerald-600/75">
        veloce
      </text>
    </svg>
  );
}

/** Scudo centrato, minacce su angoli simmetrici fissi */
function SecurityVisual({ animate }: VisualProps) {
  const threats = [
    { cx: 56, cy: 56 },
    { cx: 264, cy: 56 },
    { cx: 56, cy: 144 },
    { cx: 264, cy: 144 },
  ];

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <Soft animate={animate}>
        <path
          d="M160 36l44 18v30c0 28-18 48-44 56-26-8-44-28-44-56V54l44-18z"
          fill="currentColor"
          className="fill-emerald-500/8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M146 100l10 10 18-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        />
      </Soft>

      {threats.map((t, i) => (
        <Soft key={i} animate={animate} delay={0.12 * i}>
          <circle cx={t.cx} cy={t.cy} r="16" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-rose-500/45" />
          <path
            d={`M${t.cx - 5} ${t.cy - 5}l10 10M${t.cx + 5} ${t.cy - 5}l-10 10`}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="text-rose-500/60"
          />
        </Soft>
      ))}
    </svg>
  );
}

/** Barra di ricerca + 3 risultati in colonna, stessa indentazione */
function SeoVisual({ animate }: VisualProps) {
  const rows = [
    { y: 84, rank: "1", w: 168, hot: true },
    { y: 118, rank: "2", w: 140, hot: false },
    { y: 152, rank: "3", w: 120, hot: false },
  ];

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <rect x="40" y="28" width="240" height="36" rx="18" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground/22" />
      <circle cx="60" cy="46" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground/35" />
      <path d="M66 52l7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-foreground/35" />
      <rect x="80" y="40" width="100" height="10" rx="3" className="fill-foreground/15" />

      {rows.map((r, i) => (
        <Soft key={r.rank} animate={animate} delay={i * 0.1}>
          <circle
            cx="56"
            cy={r.y + 8}
            r="11"
            className={r.hot ? "fill-emerald-500" : "fill-foreground/12"}
          />
          <text
            x="56"
            y={r.y + 12}
            textAnchor="middle"
            fill={r.hot ? "#fff" : "currentColor"}
            fontSize="11"
            fontWeight="700"
          >
            {r.rank}
          </text>
          <rect
            x="78"
            y={r.y}
            width={r.w}
            height="9"
            rx="3"
            className={r.hot ? "fill-emerald-500/70" : "fill-foreground/14"}
          />
          <rect
            x="78"
            y={r.y + 14}
            width={Math.round(r.w * 0.62)}
            height="5"
            rx="2"
            className="fill-foreground/10"
          />
        </Soft>
      ))}
    </svg>
  );
}

/** Tre stadi sulla stessa baseline, proporzioni progressive */
function ScaleVisual({ animate }: VisualProps) {
  const stages = [
    { x: 36, w: 56, h: 48, y: 100, label: "oggi" },
    { x: 124, w: 72, h: 72, y: 76, label: "domani" },
    { x: 228, w: 56, h: 96, y: 52, label: "dopo", hot: true },
  ];

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <line x1="24" y1="156" x2="296" y2="156" stroke="currentColor" strokeWidth="1.5" className="text-foreground/12" />

      {stages.map((s, i) => (
        <Soft key={s.label} animate={animate} delay={i * 0.12}>
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className={s.hot ? "text-emerald-500/65" : "text-foreground/30"}
          />
          <circle
            cx={s.x + s.w / 2}
            cy={s.y + s.h / 2}
            r={s.hot ? 9 : 7}
            className={s.hot ? "fill-emerald-500/65" : "fill-emerald-500/35"}
          />
          <text
            x={s.x + s.w / 2}
            y={176}
            textAnchor="middle"
            fill="currentColor"
            fontSize="10"
            className={s.hot ? "fill-emerald-600/70" : "fill-foreground/40"}
          >
            {s.label}
          </text>
        </Soft>
      ))}
    </svg>
  );
}

const VISUALS: Record<PlainTalkVisualId, ComponentType<VisualProps>> = {
  clients: ClientsVisual,
  aligned: AlignedVisual,
  grow: GrowVisual,
  speed: SpeedVisual,
  security: SecurityVisual,
  seo: SeoVisual,
  scale: ScaleVisual,
};

const LABELS: Record<PlainTalkVisualId, string> = {
  clients: "Illustrazione: sito che converte visitatori in contatti",
  aligned: "Illustrazione: sviluppo e comunicazione allineati sul cliente",
  grow: "Illustrazione: moduli che si aggiungono sulla stessa base",
  speed: "Illustrazione: sito lento contro sito veloce",
  security: "Illustrazione: scudo che protegge il sito",
  seo: "Illustrazione: risultati di ricerca con prima posizione",
  scale: "Illustrazione: crescita del progetto nel tempo",
};

export function PlainTalkVisual({ id, className }: PlainTalkVisualProps) {
  const animate = useCanAnimate();
  const Visual = VISUALS[id];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-80 items-center justify-center text-foreground",
        className,
      )}
      role="img"
      aria-label={LABELS[id]}
    >
      <Visual animate={animate} />
    </div>
  );
}
