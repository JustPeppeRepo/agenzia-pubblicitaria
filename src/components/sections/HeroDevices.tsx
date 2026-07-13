"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LAPTOP_WIDTH = 310;
const TABLET_WIDTH = 200;
const PHONE_WIDTH = 74;

type DeviceShellProps = {
  children: ReactNode;
  width: number;
};

function DeviceShell({ children, width }: DeviceShellProps) {
  return <div style={{ width }}>{children}</div>;
}

function LaptopDevice() {
  return (
    <DeviceShell width={LAPTOP_WIDTH}>
      <div className="rounded-[14px] border-2 border-foreground/35 bg-foreground/10 p-[11px] shadow-2xl shadow-black/30">
        <div
          className="overflow-hidden rounded-[8px] border border-foreground/20 bg-gradient-to-br from-foreground/15 to-foreground/5"
          style={{ aspectRatio: "16 / 10" }}
        >
          <div className="flex h-full flex-col p-3.5">
            <div className="mb-2.5 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-yellow-400/70" />
              <span className="size-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="h-2.5 w-2/3 rounded bg-foreground/25" />
            <div className="mt-2 h-2.5 w-1/2 rounded bg-foreground/15" />
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="aspect-square rounded bg-foreground/20" />
              <div className="aspect-square rounded bg-foreground/15" />
              <div className="aspect-square rounded bg-foreground/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-1.5 h-2 w-[94%] rounded-b-lg bg-foreground/25" />
      <div className="mx-auto h-1.5 w-24 rounded-b-xl bg-foreground/30" />
    </DeviceShell>
  );
}

function TabletDevice() {
  return (
    <DeviceShell width={TABLET_WIDTH}>
      <div className="rounded-[18px] border-2 border-foreground/35 bg-foreground/10 p-2.5 shadow-xl shadow-black/25">
        <div
          className="overflow-hidden rounded-[12px] border border-foreground/20 bg-gradient-to-br from-foreground/15 to-foreground/5"
          style={{ aspectRatio: "4 / 3" }}
        >
          <div className="flex h-full flex-col p-3">
            <div className="mx-auto mb-2.5 h-2 w-8 rounded-full bg-foreground/30" />
            <div className="flex flex-1 gap-2.5">
              <div className="w-2/5 rounded-md bg-foreground/20" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-2.5 w-full rounded bg-foreground/25" />
                <div className="h-2.5 w-4/5 rounded bg-foreground/15" />
                <div className="mt-auto h-2.5 w-2/3 rounded bg-foreground/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}

function PhoneDevice() {
  return (
    <DeviceShell width={PHONE_WIDTH}>
      <div className="rounded-[8px] border-2 border-foreground/35 bg-foreground/10 p-[7px] shadow-xl shadow-black/25">
        <div
          className="overflow-hidden rounded-[6px] border border-foreground/20 bg-gradient-to-br from-foreground/15 to-foreground/5"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          <div className="flex h-full flex-col p-2.5">
            <div className="mx-auto mb-2.5 h-[4px] w-7 rounded-full bg-foreground/30" />
            <div className="h-2 w-full rounded bg-foreground/25" />
            <div className="mt-2 h-2 w-3/4 rounded bg-foreground/15" />
            <div className="mt-2.5 flex-1 rounded bg-foreground/20" />
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              <div className="h-4 rounded bg-foreground/15" />
              <div className="h-4 rounded bg-foreground/10" />
            </div>
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}

type DeviceMotionProps = {
  children: ReactNode;
  scrollY: MotionValue<number>;
  parallaxX: MotionValue<number>;
  parallaxRotate: MotionValue<number>;
  baseRotate: number;
  baseX?: number;
  baseY: number;
  hoverRotate: number;
  floatDelay: number;
  floatDuration: number;
  reducedMotion: boolean;
  className?: string;
};

function DeviceMotion({
  children,
  scrollY,
  parallaxX,
  parallaxRotate,
  baseRotate,
  baseX = 0,
  baseY,
  hoverRotate,
  floatDelay,
  floatDuration,
  reducedMotion,
  className,
}: DeviceMotionProps) {
  const baseStyle = {
    transform: `rotate(${baseRotate}deg) translate(${baseX}px, ${baseY}px)`,
    transformOrigin: "center center",
  };

  if (reducedMotion) {
    return (
      <div className={className} style={baseStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} style={{ y: scrollY }}>
      <motion.div
        style={{ rotate: baseRotate, x: baseX, y: baseY }}
        className="origin-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: floatDelay }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay + 0.3,
          }}
          whileHover={{
            y: -20,
            rotate: hoverRotate,
            scale: 1.06,
            transition: { duration: 0.25 },
          }}
          style={{ x: parallaxX, rotate: parallaxRotate }}
          className="origin-center"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

type HeroDevicesProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroDevices({ sectionRef }: HeroDevicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const shouldAnimate = !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const laptopY = useTransform(scrollYProgress, [0, 1], [35, -45]);
  const tabletY = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [50, -60]);

  const springConfig = { stiffness: 150, damping: 20 };
  const laptopParallaxX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );
  const tabletParallaxX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-14, 14]),
    springConfig,
  );
  const phoneParallaxX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-18, 18]),
    springConfig,
  );
  const laptopParallaxRotate = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [3, -3]),
    springConfig,
  );
  const tabletParallaxRotate = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-5, 5]),
    springConfig,
  );
  const phoneParallaxRotate = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    springConfig,
  );

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!shouldAnimate || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-animate={shouldAnimate ? "on" : "off"}
      className="mx-auto w-full max-w-[310px]"
    >
      <div className="relative flex flex-col items-center gap-5 sm:gap-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-4 left-1/2 w-40 -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
        />

        <div className="flex w-full max-w-[310px] items-center justify-center gap-3 sm:gap-4">
          <DeviceMotion
            scrollY={tabletY}
            parallaxX={tabletParallaxX}
            parallaxRotate={tabletParallaxRotate}
            baseRotate={0}
            baseX={0}
            baseY={0}
            hoverRotate={-2}
            floatDelay={0.15}
            floatDuration={3.6}
            reducedMotion={reducedMotion}
          >
            <TabletDevice />
          </DeviceMotion>

          <DeviceMotion
            scrollY={phoneY}
            parallaxX={phoneParallaxX}
            parallaxRotate={phoneParallaxRotate}
            baseRotate={0}
            baseX={0}
            baseY={0}
            hoverRotate={2}
            floatDelay={0.3}
            floatDuration={2.8}
            reducedMotion={reducedMotion}
          >
            <PhoneDevice />
          </DeviceMotion>
        </div>

        <DeviceMotion
          className="mx-auto"
          scrollY={laptopY}
          parallaxX={laptopParallaxX}
          parallaxRotate={laptopParallaxRotate}
          baseRotate={0}
          baseY={0}
          hoverRotate={2}
          floatDelay={0}
          floatDuration={4}
          reducedMotion={reducedMotion}
        >
          <LaptopDevice />
        </DeviceMotion>
      </div>
    </div>
  );
}
