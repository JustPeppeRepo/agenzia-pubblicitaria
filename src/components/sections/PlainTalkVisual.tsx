"use client";

import { animate as motionAnimate, motion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
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

/** Visual one-shot che ripartono a ogni rientro in viewport */
const REPLAY_ON_VIEW = new Set<PlainTalkVisualId>(["speed", "seo"]);

function useCanAnimate() {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  return mounted && !prefersReducedMotion;
}

/**
 * Avvia l’animazione in viewport e la resetta all’uscita,
 * così al rientro riparte (soglie pensate anche per mobile).
 */
function useReplayOnView(enabled: boolean): {
  ref: RefObject<HTMLDivElement | null>;
  active: boolean;
  cycle: number;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cycle, setCycle] = useState(0);
  const [active, setActive] = useState(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      inViewRef.current = false;
      setActive(false);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Enter: abbastanza visibile. Exit: quasi fuori (evita flicker su mobile).
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.28;
        const hidden =
          !entry.isIntersecting || entry.intersectionRatio < 0.06;

        if (visible && !inViewRef.current) {
          inViewRef.current = true;
          setCycle((c) => c + 1);
          setActive(true);
        } else if (hidden && inViewRef.current) {
          inViewRef.current = false;
          setActive(false);
        }
      },
      {
        threshold: [0, 0.06, 0.28, 0.45, 0.7],
        // Margine inferiore: conta “in vista” solo se è davvero nello schermo
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, active: enabled && active, cycle };
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

/** Contenuto sito semplificato — scroll andata/ritorno, fase per-device */
function SiteScrollContent({
  x,
  screenY,
  width,
  animate,
  duration = 9.6,
  distance = 58,
  /** 0 = alto→basso, 0.5 = basso→alto, 0.25 = parte a metà corsa */
  phase = 0,
  layout,
}: {
  x: number;
  screenY: number;
  width: number;
  animate: boolean;
  duration?: number;
  distance?: number;
  phase?: 0 | 0.25 | 0.5;
  layout: "desktop" | "tablet" | "mobile";
}) {
  const pad = layout === "mobile" ? 5 : 6;
  const inner = width - pad * 2;
  const y0 = screenY;
  const mid = -distance / 2;
  const keyframes =
    phase === 0.5
      ? [-distance, 0, -distance]
      : phase === 0.25
        ? [mid, -distance, mid, 0, mid]
        : [0, -distance, 0];
  const times =
    phase === 0.25 ? [0, 0.25, 0.5, 0.75, 1] : [0, 0.5, 1];

  return (
    <motion.g
      initial={false}
      animate={animate ? { y: keyframes } : { y: 0 }}
      transition={
        animate
          ? {
              duration,
              ease: "easeInOut",
              times,
              repeat: Infinity,
            }
          : { duration: 0 }
      }
    >
      {/* Nav */}
      <rect x={x + pad} y={y0 + 4} width={inner} height={7} rx="2" className="fill-foreground/12" />
      <rect
        x={x + pad + 2}
        y={y0 + 6}
        width={layout === "mobile" ? 12 : 18}
        height={3}
        rx="1"
        className="fill-emerald-500/70"
      />

      {/* Hero */}
      <rect
        x={x + pad}
        y={y0 + 14}
        width={inner}
        height={layout === "mobile" ? 20 : 16}
        rx="3"
        className="fill-emerald-500/35"
      />

      {layout === "desktop" ? (
        <>
          <rect x={x + pad} y={y0 + 34} width={(inner - 4) / 2} height={14} rx="2" className="fill-foreground/14" />
          <rect x={x + pad + (inner - 4) / 2 + 4} y={y0 + 34} width={(inner - 4) / 2} height={14} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 52} width={inner} height={8} rx="2" className="fill-foreground/12" />
          <rect x={x + pad} y={y0 + 64} width={inner * 0.7} height={6} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 74} width={inner * 0.45} height={8} rx="3" className="fill-emerald-500/55" />
          <rect x={x + pad} y={y0 + 88} width={inner} height={12} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 104} width={inner * 0.55} height={6} rx="2" className="fill-foreground/12" />
          <rect x={x + pad} y={y0 + 116} width={inner} height={10} rx="2" className="fill-foreground/10" />
        </>
      ) : layout === "tablet" ? (
        <>
          <rect x={x + pad} y={y0 + 34} width={inner} height={12} rx="2" className="fill-foreground/14" />
          <rect x={x + pad} y={y0 + 50} width={inner} height={12} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 66} width={inner * 0.55} height={8} rx="3" className="fill-emerald-500/55" />
          <rect x={x + pad} y={y0 + 80} width={inner} height={10} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 94} width={inner * 0.7} height={6} rx="2" className="fill-foreground/12" />
          <rect x={x + pad} y={y0 + 106} width={inner} height={10} rx="2" className="fill-foreground/10" />
        </>
      ) : (
        <>
          <rect x={x + pad} y={y0 + 38} width={inner} height={10} rx="2" className="fill-foreground/14" />
          <rect x={x + pad} y={y0 + 52} width={inner} height={10} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 66} width={inner} height={10} rx="2" className="fill-foreground/12" />
          <rect x={x + pad} y={y0 + 80} width={inner} height={12} rx="3" className="fill-emerald-500/55" />
          <rect x={x + pad} y={y0 + 96} width={inner * 0.75} height={6} rx="2" className="fill-foreground/10" />
          <rect x={x + pad} y={y0 + 108} width={inner} height={10} rx="2" className="fill-foreground/12" />
        </>
      )}
    </motion.g>
  );
}

/** Desktop + tablet + phone: stesso sito, layout adattivo, scroll lineare */
function ResponsiveVisual({ animate }: VisualProps) {
  const uid = useId().replace(/:/g, "");
  const clipDesktop = `pt-desk-${uid}`;
  const clipTablet = `pt-tab-${uid}`;
  const clipPhone = `pt-phone-${uid}`;

  // Desktop più largo; title bar sopra lo schermo
  const desk = { x: 6, y: 22, w: 142, h: 118, screenX: 10, screenY: 42, screenW: 134, screenH: 86 };
  // Gap ~14px → tablet
  const tab = { x: 162, y: 34, w: 68, h: 106, screenX: 166, screenY: 40, screenW: 60, screenH: 90 };
  // Gap ~14px → phone
  const phone = { x: 244, y: 42, w: 54, h: 98, screenX: 248, screenY: 52, screenW: 46, screenH: 78 };

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <defs>
        <clipPath id={clipDesktop}>
          <rect x={desk.screenX} y={desk.screenY} width={desk.screenW} height={desk.screenH} rx="2" />
        </clipPath>
        <clipPath id={clipTablet}>
          <rect x={tab.screenX} y={tab.screenY} width={tab.screenW} height={tab.screenH} rx="3" />
        </clipPath>
        <clipPath id={clipPhone}>
          <rect x={phone.screenX} y={phone.screenY} width={phone.screenW} height={phone.screenH} rx="3" />
        </clipPath>
      </defs>

      {/* Desktop */}
      <rect
        x={desk.x}
        y={desk.y}
        width={desk.w}
        height={desk.h}
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-foreground/28"
      />
      {/* Title bar — above screen */}
      <rect
        x={desk.x + 1}
        y={desk.y + 1}
        width={desk.w - 2}
        height="18"
        rx="7"
        className="fill-foreground/[0.04]"
      />
      <circle cx={desk.x + 14} cy={desk.y + 10} r="2.5" className="fill-foreground/25" />
      <circle cx={desk.x + 24} cy={desk.y + 10} r="2.5" className="fill-foreground/18" />
      <circle cx={desk.x + 34} cy={desk.y + 10} r="2.5" className="fill-foreground/12" />
      <rect
        x={desk.screenX}
        y={desk.screenY}
        width={desk.screenW}
        height={desk.screenH}
        className="fill-foreground/[0.03]"
      />
      <g clipPath={`url(#${clipDesktop})`}>
        <SiteScrollContent
          x={desk.screenX}
          screenY={desk.screenY}
          width={desk.screenW}
          animate={animate}
          duration={8.4}
          distance={52}
          phase={0}
          layout="desktop"
        />
      </g>
      <rect x="52" y="146" width="50" height="5" rx="2" className="fill-foreground/12" />
      <rect x="40" y="151" width="74" height="3" rx="1" className="fill-foreground/10" />
      <text
        x={desk.x + desk.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/40"
      >
        Desktop
      </text>

      {/* Tablet */}
      <rect
        x={tab.x}
        y={tab.y}
        width={tab.w}
        height={tab.h}
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-emerald-500/45"
      />
      <rect
        x={tab.screenX}
        y={tab.screenY}
        width={tab.screenW}
        height={tab.screenH}
        className="fill-foreground/[0.03]"
      />
      <g clipPath={`url(#${clipTablet})`}>
        <SiteScrollContent
          x={tab.screenX}
          screenY={tab.screenY}
          width={tab.screenW}
          animate={animate}
          duration={11.2}
          distance={62}
          phase={0.5}
          layout="tablet"
        />
      </g>
      <circle cx={tab.x + tab.w / 2} cy={tab.y + tab.h - 8} r="2.5" className="fill-foreground/15" />
      <text
        x={tab.x + tab.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/40"
      >
        Tablet
      </text>

      {/* Phone */}
      <rect
        x={phone.x}
        y={phone.y}
        width={phone.w}
        height={phone.h}
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-emerald-500/65"
      />
      <rect
        x={phone.x + phone.w / 2 - 10}
        y={phone.y + 5}
        width="20"
        height="3"
        rx="1.5"
        className="fill-foreground/15"
      />
      <rect
        x={phone.screenX}
        y={phone.screenY}
        width={phone.screenW}
        height={phone.screenH}
        className="fill-foreground/[0.03]"
      />
      <g clipPath={`url(#${clipPhone})`}>
        <SiteScrollContent
          x={phone.screenX}
          screenY={phone.screenY}
          width={phone.screenW}
          animate={animate}
          duration={6.8}
          distance={56}
          phase={0.25}
          layout="mobile"
        />
      </g>
      <circle cx={phone.x + phone.w / 2} cy={phone.y + phone.h - 7} r="2.5" className="fill-foreground/15" />
      <text
        x={phone.x + phone.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/40"
      >
        Mobile
      </text>
    </svg>
  );
}

const SCORE_EASE = [0.22, 1, 0.36, 1] as const;
const SCORE_DURATION = 1.6;

/** Score ring — parte da 0 e riempie fino allo score */
function ScoreRing({
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
        className="text-foreground/10"
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
        className="text-emerald-500"
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
function SpeedVisual({ animate }: VisualProps) {
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
      {/* Panel */}
      <rect
        x="16"
        y="12"
        width="288"
        height="176"
        rx="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/15"
      />

      {/* Header */}
      <text
        x="36"
        y="40"
        fill="currentColor"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.06em"
        className="fill-foreground/45"
      >
        SPEED INSIGHTS
      </text>
      <Soft animate={animate} delay={0.4}>
        <circle cx="276" cy="34" r="4" className="fill-emerald-500" />
        <circle cx="276" cy="34" r="8" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-emerald-500/40" />
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
        className="fill-foreground/45"
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
              fill="currentColor"
              className="fill-foreground/[0.04]"
            />
            <Soft animate={animate} delay={0.2 + i * 0.12}>
              <circle cx={cardX + 14} cy={y + 17} r="4" className="fill-emerald-500" />
            </Soft>
            <text
              x={cardX + 28}
              y={y + 14}
              fill="currentColor"
              fontSize="10"
              fontWeight="600"
              className="fill-foreground/55"
            >
              {m.label}
            </text>
            <text
              x={cardX + 28}
              y={y + 28}
              fill="currentColor"
              fontSize="12"
              fontWeight="700"
              className="fill-emerald-600/85"
            >
              {m.value}
            </text>
            <text
              x={cardX + cardW - 12}
              y={y + 20}
              textAnchor="end"
              fill="currentColor"
              fontSize="9"
              className="fill-emerald-600/70"
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
            className="fill-emerald-500"
          />
        </motion.g>
      </g>
    </svg>
  );
}

/** Scudo centrato, minacce su angoli simmetrici fissi */
function SecurityVisual({ animate }: VisualProps) {
  const threats = [
    { x: 52, y: 44, dx: 68, dy: 40 },
    { x: 268, y: 44, dx: -68, dy: 40 },
    { x: 52, y: 148, dx: 68, dy: -36 },
    { x: 268, y: 148, dx: -68, dy: -36 },
  ];
  const cycle = 3.6;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <motion.g
        initial={false}
        animate={animate ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{
          duration: 3.4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <path
          d="M160 36l44 18v30c0 28-18 48-44 56-26-8-44-28-44-56V54l44-18z"
          className="fill-emerald-500"
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
          <motion.circle
            cx={t.x + t.dx}
            cy={t.y + t.dy}
            r={16}
            className="fill-rose-400/35"
            initial={false}
            animate={
              animate
                ? { opacity: [0, 0, 0.55, 0] }
                : { opacity: 0 }
            }
            transition={{
              duration: cycle,
              delay: i * 0.55,
              times: [0, 0.48, 0.56, 0.72],
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <motion.g
            initial={false}
            animate={
              animate
                ? {
                    x: [0, t.dx, t.dx * 0.78, 0],
                    y: [0, t.dy, t.dy * 0.78, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={{
              duration: cycle,
              delay: i * 0.55,
              times: [0, 0.5, 0.62, 1],
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <circle
              cx={t.x}
              cy={t.y}
              r={14}
              className="fill-rose-700"
            />
            <circle
              cx={t.x}
              cy={t.y}
              r={14}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="text-rose-900 dark:text-rose-800"
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

/** SERP: sale dal 3° al 1° e resta; riparte al rientro in viewport */
function SeoVisual({ animate }: VisualProps) {
  const [done, setDone] = useState(false);
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const reduced = mounted && prefersReducedMotion;
  const play = animate && !done && !reduced;
  // done resta true dopo il play: in uscita dalla viewport tiene il #1 finché non remounta
  const showFinal = done || reduced;

  useEffect(() => {
    if (animate) setDone(false);
  }, [animate]);

  const slots = [54, 126, 166] as const;
  const climb = {
    duration: 3.4,
    ease: [0.45, 0, 0.15, 1] as const,
    times: [0, 0.14, 0.38, 0.62, 0.78, 1],
  };

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
        strokeWidth="1.75"
        className="text-foreground/22"
      />
      <circle cx="48" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-foreground/35" />
      <path d="M53 33l6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-foreground/35" />
      <text
        x="66"
        y="32"
        fill="currentColor"
        fontSize="11"
        fontWeight="500"
        className="fill-foreground/55"
      >
        migliore negozio a Palermo
      </text>

      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <circle
            cx="44"
            cy={n === 1 ? slots[0] + 28 : slots[i] + 12}
            r={n === 1 ? 13 : 10}
            className={n === 1 ? "fill-emerald-500" : "fill-foreground/12"}
          />
          <text
            x="44"
            y={n === 1 ? slots[0] + 33 : slots[i] + 16}
            textAnchor="middle"
            fill={n === 1 ? "#fff" : "currentColor"}
            fontSize={n === 1 ? 13 : 10}
            fontWeight="700"
            className={n === 1 ? undefined : "fill-foreground/45"}
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
        opacity={0.38}
      >
        <rect x="70" y="4" width="140" height="8" rx="3" className="fill-foreground/16" />
        <rect x="70" y="16" width="88" height="5" rx="2" className="fill-foreground/10" />
      </motion.g>

      <motion.g
        initial={false}
        animate={
          play
            ? { y: [slots[1], slots[1], slots[2], slots[2], slots[2], slots[2]] }
            : { y: showFinal ? slots[2] : slots[1] }
        }
        transition={climb}
        opacity={0.32}
      >
        <rect x="70" y="4" width="118" height="8" rx="3" className="fill-foreground/16" />
        <rect x="70" y="16" width="72" height="5" rx="2" className="fill-foreground/10" />
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
        <rect
          x="66"
          y="0"
          width="210"
          height="56"
          rx="10"
          fill="currentColor"
          className="fill-emerald-500/[0.1]"
        />
        <rect x="66" y="0" width="4" height="56" rx="2" className="fill-emerald-500" />
        {/* Favicon */}
        <rect x="80" y="10" width="18" height="18" rx="4" className="fill-emerald-500" />
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
          className="fill-emerald-600"
        >
          Negozio Rossi Palermo
        </text>
        <text
          x="104"
          y="30"
          fill="currentColor"
          fontSize="8.5"
          fontWeight="500"
          className="fill-emerald-600/70"
        >
          www.tuosito.it
        </text>
        <text
          x="80"
          y="48"
          fill="currentColor"
          fontSize="8.5"
          className="fill-foreground/45"
        >
          Orari, mappa e recensioni del negozio.
        </text>
      </motion.g>
    </svg>
  );
}

/**
 * Scalabilità: nucleo solido (il sito) che non si ricostruisce;
 * nuovi moduli si agganciano come pezzi di un sistema vivo.
 */
function ScaleVisual({ animate }: VisualProps) {
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
          className="text-emerald-500/25"
        />
      </Soft>
      <motion.circle
        cx={coreCx}
        cy={coreCy}
        r={84}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-emerald-500/15"
        initial={false}
        animate={animate ? { opacity: [0.2, 0.55, 0.2] } : { opacity: 0.35 }}
        transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Connettori nucleo ↔ moduli */}
      {modules.map((m) => {
        const mx = m.x + 36;
        const my = m.y + 22;
        return (
          <motion.line
            key={`line-${m.id}`}
            x1={coreCx}
            y1={coreCy}
            x2={mx}
            y2={my}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-emerald-500/40"
            initial={false}
            animate={
              animate
                ? { opacity: [0, 0, 1, 1, 0] }
                : { opacity: 0.7 }
            }
            transition={{
              duration: cycle,
              delay: m.delay,
              times: [0, 0.08, 0.22, 0.78, 1],
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        );
      })}

      {/* Particelle di carico che fluiscono verso il nucleo */}
      {modules.map((m) => {
        const mx = m.x + 36;
        const my = m.y + 22;
        return (
          <motion.circle
            key={`dot-${m.id}`}
            r={2.5}
            className="fill-emerald-500"
            initial={false}
            animate={
              animate
                ? {
                    cx: [mx, coreCx],
                    cy: [my, coreCy],
                    opacity: [0, 1, 0],
                  }
                : { cx: coreCx, cy: coreCy, opacity: 0 }
            }
            transition={{
              duration: 1.4,
              delay: m.delay + 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: cycle - 1.4,
            }}
          />
        );
      })}

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
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            className="fill-background text-foreground/18"
          />
          <rect
            x={m.x}
            y={m.y}
            width="72"
            height="44"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-emerald-500/35"
          />

          {m.icon === "users" && (
            <g className="text-emerald-500" stroke="currentColor" fill="none" strokeWidth="1.5">
              <circle cx={m.x + 32} cy={m.y + 13} r="3.5" />
              <path d={`M${m.x + 25} ${m.y + 23}c1.2-4 4-5.5 7-5.5s5.8 1.5 7 5.5`} strokeLinecap="round" />
              <circle cx={m.x + 43} cy={m.y + 14} r="2.8" opacity="0.65" />
            </g>
          )}
          {m.icon === "docs" && (
            <g className="text-emerald-500" stroke="currentColor" fill="none" strokeWidth="1.5">
              <rect x={m.x + 29} y={m.y + 8} width="14" height="16" rx="2" />
              <path d={`M${m.x + 32} ${m.y + 13}h8M${m.x + 32} ${m.y + 17}h8M${m.x + 32} ${m.y + 21}h5`} strokeLinecap="round" />
            </g>
          )}
          {m.icon === "plus" && (
            <g className="text-emerald-500" stroke="currentColor" fill="none" strokeWidth="1.75">
              <rect x={m.x + 28} y={m.y + 8} width="16" height="16" rx="4" />
              <path d={`M${m.x + 36} ${m.y + 12}v8M${m.x + 32} ${m.y + 16}h8`} strokeLinecap="round" />
            </g>
          )}
          {m.icon === "nodes" && (
            <g className="text-emerald-500" stroke="currentColor" fill="none" strokeWidth="1.5">
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
          className="fill-background"
        />
        <rect
          x={core.x}
          y={core.y}
          width={core.w}
          height={core.h}
          rx="14"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.75"
          className="fill-emerald-500/10 text-emerald-500/55"
        />
        <circle cx={core.x + 14} cy={core.y + 14} r="3" className="fill-foreground/25" />
        <circle cx={core.x + 24} cy={core.y + 14} r="3" className="fill-foreground/25" />
        <circle cx={core.x + 34} cy={core.y + 14} r="3" className="fill-foreground/25" />
        <rect
          x={core.x + 12}
          y={core.y + 28}
          width={core.w - 24}
          height={7}
          rx="2.5"
          className="fill-emerald-500/70"
        />
        <rect
          x={core.x + 12}
          y={core.y + 42}
          width={core.w - 36}
          height={5}
          rx="2"
          className="fill-foreground/15"
        />
        <rect
          x={core.x + 12}
          y={core.y + 52}
          width={core.w - 48}
          height={5}
          rx="2"
          className="fill-foreground/10"
        />
        <text
          x={coreCx}
          y={core.y + 76}
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.1em"
          className="fill-emerald-600/85"
        >
          SITO
        </text>
      </g>

    </svg>
  );
}

const VISUALS: Record<PlainTalkVisualId, ComponentType<VisualProps>> = {
  responsive: ResponsiveVisual,
  speed: SpeedVisual,
  security: SecurityVisual,
  seo: SeoVisual,
  scale: ScaleVisual,
};

const LABELS: Record<PlainTalkVisualId, string> = {
  responsive: "Illustrazione: stesso sito su desktop, tablet e smartphone",
  speed: "Illustrazione: score di performance e Core Web Vitals",
  security: "Illustrazione: scudo che protegge il sito",
  seo: "Illustrazione: il sito sale dal terzo al primo posto nei risultati di ricerca",
  scale: "Illustrazione: il nucleo del sito resta solido mentre si agganciano nuovi moduli",
};

export function PlainTalkVisual({ id, className }: PlainTalkVisualProps) {
  const canAnimate = useCanAnimate();
  const replay = REPLAY_ON_VIEW.has(id);
  const { ref, active, cycle } = useReplayOnView(canAnimate && replay);
  const animate = replay ? active : canAnimate;
  const Visual = VISUALS[id];

  return (
    <div
      ref={replay ? ref : undefined}
      className={cn(
        "mx-auto flex w-full max-w-80 items-center justify-center text-foreground",
        className,
      )}
      role="img"
      aria-label={LABELS[id]}
    >
      <Visual key={replay ? cycle : id} animate={animate} />
    </div>
  );
}
