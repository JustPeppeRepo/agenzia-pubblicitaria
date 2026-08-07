"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Soft, SiteScrollContent, type VisualProps } from "./shared";

export function ResponsiveVisual({ animate }: VisualProps) {
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

      {/* Desktop — solo stroke, senza fondo scuro */}
      <rect
        x={desk.x}
        y={desk.y}
        width={desk.w}
        height={desk.h}
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#0a0a0c]/65"
      />
      {/* Title bar — above screen */}
      <rect
        x={desk.x + 1}
        y={desk.y + 1}
        width={desk.w - 2}
        height="18"
        rx="7"
        className="fill-foreground/12"
      />
      <circle cx={desk.x + 14} cy={desk.y + 10} r="2.5" className="fill-foreground/55" />
      <circle cx={desk.x + 24} cy={desk.y + 10} r="2.5" className="fill-foreground/40" />
      <circle cx={desk.x + 34} cy={desk.y + 10} r="2.5" className="fill-foreground/30" />
      <rect
        x={desk.screenX}
        y={desk.screenY}
        width={desk.screenW}
        height={desk.screenH}
        className="fill-foreground/[0.06]"
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
      <rect x="52" y="146" width="50" height="5" rx="2" className="fill-foreground/40" />
      <rect x="40" y="151" width="74" height="3" rx="1" className="fill-foreground/30" />
      <text
        x={desk.x + desk.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/70"
      >
        Desktop
      </text>

      {/* Tablet — solo stroke */}
      <rect
        x={tab.x}
        y={tab.y}
        width={tab.w}
        height={tab.h}
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#0a0a0c]/65"
      />
      <rect
        x={tab.screenX}
        y={tab.screenY}
        width={tab.screenW}
        height={tab.screenH}
        className="fill-foreground/[0.06]"
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
      <circle cx={tab.x + tab.w / 2} cy={tab.y + tab.h - 8} r="2.5" className="fill-foreground/45" />
      <text
        x={tab.x + tab.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/70"
      >
        Tablet
      </text>

      {/* Phone — solo stroke */}
      <rect
        x={phone.x}
        y={phone.y}
        width={phone.w}
        height={phone.h}
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[#0a0a0c]/65"
      />
      <rect
        x={phone.x + phone.w / 2 - 10}
        y={phone.y + 5}
        width="20"
        height="3"
        rx="1.5"
        className="fill-foreground/40"
      />
      <rect
        x={phone.screenX}
        y={phone.screenY}
        width={phone.screenW}
        height={phone.screenH}
        className="fill-foreground/[0.06]"
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
      <circle cx={phone.x + phone.w / 2} cy={phone.y + phone.h - 7} r="2.5" className="fill-foreground/45" />
      <text
        x={phone.x + phone.w / 2}
        y="172"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        className="fill-foreground/70"
      >
        Mobile
      </text>
    </svg>
  );
}

const SCORE_EASE = [0.22, 1, 0.36, 1] as const;
const SCORE_DURATION = 1.6;

