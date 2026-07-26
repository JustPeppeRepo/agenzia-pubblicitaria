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
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
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
      <ScoreRing cx="96" cy="112" r="44" score={100} animate={animate} strokeWidth={8} />
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
    </svg>
  );
}

/** Scudo centrato, minacce su angoli simmetrici fissi */
/** Minacce verso lo scudo → rimbalzo + flash d’impatto */
function SecurityVisual({ animate }: VisualProps) {
  const threats = [
    { x: 52, y: 44, dx: 68, dy: 40 },
    { x: 268, y: 44, dx: -68, dy: 40 },
    { x: 52, y: 148, dx: 68, dy: -36 },
    { x: 268, y: 148, dx: -68, dy: -36 },
  ];
  const cycle = 2.8;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <motion.g
        initial={false}
        animate={animate ? { x: [-10, 10], y: [7, -7] } : { x: 0, y: 0 }}
        transition={{
          x: {
            duration: 5.4,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          },
          y: {
            duration: 6.8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      >
        <path
          d="M160 36l44 18v30c0 28-18 48-44 56-26-8-44-28-44-56V54l44-18z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          className="fill-emerald-500/8 text-emerald-500/70"
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
      </motion.g>

      {threats.map((t, i) => (
        <g key={i}>
          {/* Flash d’impatto rosso — solo all’urto coi pallini */}
          <motion.circle
            cx={t.x + t.dx}
            cy={t.y + t.dy}
            r={12}
            className="fill-rose-500"
            initial={false}
            animate={animate ? { opacity: [0, 0, 0.45, 0], scale: [0.5, 0.5, 1.2, 1.45] } : { opacity: 0 }}
            transition={{
              duration: cycle,
              delay: i * 0.4,
              times: [0, 0.48, 0.56, 0.72],
              ease: "easeOut",
              repeat: Infinity,
            }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          <motion.circle
            cx={t.x + t.dx}
            cy={t.y + t.dy}
            r={16}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-rose-500"
            initial={false}
            animate={animate ? { opacity: [0, 0, 0.65, 0], scale: [0.6, 0.6, 1.25, 1.5] } : { opacity: 0 }}
            transition={{
              duration: cycle,
              delay: i * 0.4,
              times: [0, 0.48, 0.56, 0.72],
              ease: "easeOut",
              repeat: Infinity,
            }}
            style={{ originX: 0.5, originY: 0.5 }}
          />

          <motion.g
            initial={false}
            animate={
              animate
                ? {
                    x: [0, t.dx, t.dx * 0.72, 0],
                    y: [0, t.dy, t.dy * 0.72, 0],
                  }
                : { x: 0, y: 0 }
            }
            transition={{
              duration: cycle,
              delay: i * 0.4,
              times: [0, 0.52, 0.64, 1],
              ease: ["easeIn", "easeOut", "easeInOut"],
              repeat: Infinity,
            }}
          >
            <circle
              cx={t.x}
              cy={t.y}
              r={13}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="text-rose-500/55"
            />
            <path
              d={`M${t.x - 4.5} ${t.y - 4.5}l9 9M${t.x + 4.5} ${t.y - 4.5}l-9 9`}
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="text-rose-500/70"
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

  const slots = [56, 118, 158] as const;
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
      <rect x="66" y="23" width="96" height="9" rx="3" className="fill-foreground/15" />

      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <circle
            cx="44"
            cy={n === 1 ? slots[0] + 22 : slots[i] + 12}
            r={n === 1 ? 13 : 10}
            className={n === 1 ? "fill-emerald-500" : "fill-foreground/12"}
          />
          <text
            x="44"
            y={n === 1 ? slots[0] + 27 : slots[i] + 16}
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
          height="44"
          rx="10"
          fill="currentColor"
          className="fill-emerald-500/[0.1]"
        />
        <rect x="66" y="0" width="4" height="44" rx="2" className="fill-emerald-500" />
        <rect x="80" y="10" width="160" height="10" rx="3" className="fill-emerald-500/80" />
        <text
          x="80"
          y="36"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          className="fill-emerald-600/85"
        >
          www.tuosito.it
        </text>
      </motion.g>

      <motion.g
        initial={false}
        animate={
          play
            ? { opacity: [0, 0, 0, 0, 1, 1] }
            : { opacity: showFinal ? 1 : 0 }
        }
        transition={climb}
      >
        <rect x="214" y="50" width="78" height="16" rx="5" className="fill-emerald-500" />
        <text
          x="253"
          y="61"
          textAnchor="middle"
          fill="#fff"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          1° POSIZIONE
        </text>
      </motion.g>
    </svg>
  );
}

/** Grafico clienti in crescita + freccia che segue la curva */
function ScaleVisual({ animate }: VisualProps) {
  const pts = [
    { x: 48, y: 142 },
    { x: 96, y: 128 },
    { x: 144, y: 108 },
    { x: 192, y: 78 },
    { x: 236, y: 52 },
    { x: 272, y: 38 },
  ];
  const lineD = `M${pts.map((p) => `${p.x} ${p.y}`).join(" L")}`;
  const areaD = `${lineD} L${pts[pts.length - 1].x} 156 L${pts[0].x} 156 Z`;
  const duration = 5.2;
  const repeatDelay = 2;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      {/* Assi */}
      <line x1="40" y1="28" x2="40" y2="156" stroke="currentColor" strokeWidth="1.5" className="text-foreground/15" />
      <line x1="40" y1="156" x2="292" y2="156" stroke="currentColor" strokeWidth="1.5" className="text-foreground/15" />

      {[60, 96, 132].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="292"
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="text-foreground/8"
        />
      ))}

      <text x="36" y="22" fill="currentColor" fontSize="9" fontWeight="600" className="fill-foreground/40">
        Clienti
      </text>

      {/* Area */}
      <motion.path
        d={areaD}
        className="fill-emerald-500/10"
        initial={false}
        animate={animate ? { opacity: [0.15, 1, 1, 0.15] } : { opacity: 0.9 }}
        transition={{
          duration,
          times: [0, 0.45, 0.85, 1],
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay,
        }}
      />

      {/* Linea */}
      <motion.path
        d={lineD}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-500"
        initial={false}
        animate={animate ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{
          duration: duration * 0.7,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
          repeatDelay: repeatDelay + duration * 0.3,
        }}
      />

      {/* Punti */}
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === pts.length - 1 ? 4.5 : 3}
          className="fill-emerald-500"
          initial={false}
          animate={
            animate
              ? { opacity: [0, 1, 1], scale: [0.6, 1, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: duration * 0.7,
            times: [0, 0.15, 1],
            delay: animate ? (i / (pts.length - 1)) * duration * 0.55 : 0,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: repeatDelay + duration * 0.3,
          }}
        />
      ))}

      <text x="48" y="176" textAnchor="middle" fill="currentColor" fontSize="9" className="fill-foreground/40">
        inizio
      </text>
      <text x="164" y="176" textAnchor="middle" fill="currentColor" fontSize="9" className="fill-foreground/40">
        tempo
      </text>
      <text x="272" y="176" textAnchor="middle" fill="currentColor" fontSize="9" className="fill-emerald-600/75">
        oggi
      </text>

      <text
        x="300"
        y="18"
        textAnchor="end"
        fill="currentColor"
        fontSize="11"
        fontWeight="700"
        className="fill-emerald-600/80"
      >
        + clienti
      </text>
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
  scale: "Illustrazione: grafico della crescita dei clienti nel tempo",
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
