"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

const FRONTEND_TECHS = [
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TS" },
  { id: "tailwind", label: "Tailwind" },
  { id: "framer", label: "Motion" },
] as const;

const SERVER_TECHS = [
  { id: "nextjs", label: "API Routes" },
  { id: "express", label: "Express" },
] as const;

function BrowserIllustration() {
  return (
    <svg viewBox="0 0 80 64" className="mx-auto h-16 w-20" aria-hidden>
      <rect
        x="4"
        y="8"
        width="72"
        height="48"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/30"
      />
      <rect
        x="4"
        y="8"
        width="72"
        height="12"
        rx="6"
        className="fill-foreground/10"
      />
      <circle cx="12" cy="14" r="2" className="fill-red-400/80" />
      <circle cx="20" cy="14" r="2" className="fill-yellow-400/80" />
      <circle cx="28" cy="14" r="2" className="fill-green-400/80" />
      <rect x="14" y="28" width="36" height="3" rx="1" className="fill-foreground/25" />
      <rect x="14" y="36" width="24" height="3" rx="1" className="fill-foreground/15" />
      <rect x="14" y="44" width="48" height="6" rx="2" className="fill-emerald-500/30" />
      <circle cx="58" cy="38" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/25" />
      <circle cx="58" cy="34" r="4" className="fill-foreground/20" />
      <path d="M52 44 Q58 48 64 44" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
    </svg>
  );
}

function DatabaseIllustration() {
  return (
    <svg viewBox="0 0 72 80" className="mx-auto h-20 w-[4.5rem]" aria-hidden>
      <ellipse cx="36" cy="16" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/35" />
      <path
        d="M8 16 v44 c0 5.5 12.5 10 28 10 s28-4.5 28-10 V16"
        fill="color-mix(in srgb, var(--foreground) 6%, transparent)"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/35"
      />
      <ellipse cx="36" cy="32" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/20" />
      <ellipse cx="36" cy="48" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/20" />
      <ellipse cx="36" cy="60" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/35" />
    </svg>
  );
}

function ServerIllustration() {
  return (
    <svg viewBox="0 0 72 64" className="mx-auto h-16 w-[4.5rem]" aria-hidden>
      <rect x="8" y="6" width="56" height="16" rx="3" fill="color-mix(in srgb, var(--foreground) 8%, transparent)" stroke="currentColor" strokeWidth="1.5" className="text-foreground/30" />
      <rect x="8" y="26" width="56" height="16" rx="3" fill="color-mix(in srgb, var(--foreground) 6%, transparent)" stroke="currentColor" strokeWidth="1.5" className="text-foreground/30" />
      <rect x="8" y="46" width="56" height="12" rx="3" fill="color-mix(in srgb, var(--foreground) 4%, transparent)" stroke="currentColor" strokeWidth="1.5" className="text-foreground/30" />
      <circle cx="58" cy="14" r="2" className="fill-emerald-500/70" />
      <circle cx="58" cy="34" r="2" className="fill-emerald-500/70" />
      <circle cx="58" cy="52" r="2" className="fill-foreground/25" />
      <rect x="14" y="12" width="20" height="4" rx="1" className="fill-foreground/20" />
      <rect x="14" y="32" width="28" height="4" rx="1" className="fill-foreground/20" />
    </svg>
  );
}

function FrontendIllustration() {
  return (
    <svg viewBox="0 0 120 72" className="mx-auto h-[4.5rem] w-full max-w-[7.5rem]" aria-hidden>
      <rect x="4" y="4" width="112" height="64" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/40" />
      <rect x="4" y="4" width="112" height="14" rx="6" className="fill-emerald-500/10" />
      <circle cx="14" cy="11" r="2" className="fill-red-400/70" />
      <circle cx="22" cy="11" r="2" className="fill-yellow-400/70" />
      <circle cx="30" cy="11" r="2" className="fill-green-400/70" />
      <rect x="12" y="26" width="48" height="4" rx="1" className="fill-foreground/25" />
      <rect x="12" y="36" width="32" height="3" rx="1" className="fill-foreground/15" />
      <rect x="12" y="52" width="40" height="8" rx="3" className="fill-emerald-500/35" />
      <rect x="68" y="24" width="36" height="28" rx="3" className="fill-foreground/8" stroke="currentColor" strokeWidth="1" />
      <rect x="74" y="30" width="24" height="3" rx="1" className="fill-foreground/15" />
      <rect x="74" y="38" width="16" height="3" rx="1" className="fill-foreground/10" />
    </svg>
  );
}

function ConnectorIcon({ type }: { type: "https" | "json" | "sql" | "response" }) {
  if (type === "https") {
    return (
      <svg viewBox="0 0 20 20" className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden>
        <rect x="4" y="9" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9V6a3 3 0 116 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "json") {
    return (
      <svg viewBox="0 0 20 20" className="size-4 text-foreground/50" aria-hidden>
        <text x="3" y="15" fontSize="13" fontWeight="600" fill="currentColor">{`{ }`}</text>
      </svg>
    );
  }
  if (type === "sql") {
    return (
      <svg viewBox="0 0 20 20" className="size-4 text-foreground/50" aria-hidden>
        <ellipse cx="10" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden>
      <path d="M4 10h10M10 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlowConnector({
  label,
  sublabel,
  icon,
  dashed = false,
  vertical = false,
}: {
  label: string;
  sublabel: string;
  icon: "https" | "json" | "sql" | "response";
  dashed?: boolean;
  vertical?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center self-center",
        vertical ? "flex-col py-2" : "flex-col px-1 lg:px-2",
      )}
    >
      <div className="flex items-center gap-1 rounded-md bg-background px-2 py-1 ring-1 ring-foreground/10">
        <ConnectorIcon type={icon} />
        <div className="text-center">
          <p className="text-[10px] font-semibold leading-none text-emerald-600 dark:text-emerald-400">
            {label}
          </p>
          <p className="mt-0.5 text-[9px] leading-none text-foreground/45">{sublabel}</p>
        </div>
      </div>
      <svg
        viewBox={vertical ? "0 0 24 40" : "0 0 40 24"}
        className={cn(
          vertical ? "mt-1 h-8 w-5" : "mt-1 h-5 w-10 lg:w-14",
        )}
        aria-hidden
      >
        {vertical ? (
          <path
            d="M12 4v28M12 32l-4-4M12 32l4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dashed ? "4 3" : undefined}
            className="text-foreground/30"
          />
        ) : (
          <path
            d="M4 12h28M32 12l-4-4M32 12l-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dashed ? "4 3" : undefined}
            className="text-foreground/30"
          />
        )}
      </svg>
    </div>
  );
}

function DiagramNode({
  title,
  subtitle,
  optional = false,
  accent = false,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  optional?: boolean;
  accent?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col items-center rounded-lg border-2 px-3 py-4 text-center",
        accent
          ? "border-emerald-500/35 bg-emerald-500/[0.06]"
          : "border-foreground/20 bg-background",
        optional && "border-dashed border-foreground/15",
        className,
      )}
    >
      {optional ? (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-2 text-[9px] font-medium uppercase tracking-wide text-foreground/40">
          opzionale
        </span>
      ) : null}
      {children}
      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide">{title}</h3>
      <p className="mt-0.5 text-[10px] text-foreground/50">{subtitle}</p>
    </div>
  );
}

function TechBadgeRow({
  techs,
}: {
  techs: readonly { id: string; label: string }[];
}) {
  return (
    <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
      {techs.map((tech) => (
        <li
          key={tech.id + tech.label}
          className="inline-flex items-center gap-1 rounded bg-foreground/[0.06] px-1.5 py-0.5"
          title={tech.label}
        >
          <TechIcon id={tech.id} size={14} />
          <span className="text-[9px] font-medium text-foreground/60">{tech.label}</span>
        </li>
      ))}
    </ul>
  );
}

function ReturnPathSubgrid() {
  return (
    <div className="relative col-span-7 mt-3 h-14">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible text-emerald-500/55"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Vertical stem from Database */}
        <line
          x1="91.9"
          y1="0.6"
          x2="91.9"
          y2="5"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          vectorEffect="non-scaling-stroke"
        />
        {/* Return path: Database → Client (right to left) */}
        <line
          x1="91.9"
          y1="5"
          x2="7.6"
          y2="5"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          vectorEffect="non-scaling-stroke"
        />
        {/* Arrowhead at Client — points left */}
        <polygon
          points="5.6,5 7.8,3.1 7.8,6.9"
          className="fill-emerald-500/70"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="bg-background px-3 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400">
          ← risposta HTML + dati
        </span>
      </div>
    </div>
  );
}

function HorizontalDiagram() {
  return (
    <div className="hidden lg:grid grid-cols-[minmax(0,1.1fr)_auto_minmax(0,2.8fr)_auto_minmax(0,1.8fr)_auto_minmax(0,1.6fr)] items-stretch gap-x-1">
      <DiagramNode title="Client" subtitle="Browser · utente" className="min-w-0">
        <BrowserIllustration />
      </DiagramNode>

      <FlowConnector label="HTTPS" sublabel="pagina" icon="https" />

      <DiagramNode
        title="Frontend"
        subtitle="UI · pagine · animazioni"
        accent
        className="min-w-0"
      >
        <FrontendIllustration />
        <TechBadgeRow techs={FRONTEND_TECHS} />
      </DiagramNode>

      <FlowConnector label="fetch" sublabel="JSON" icon="json" dashed />

      <DiagramNode title="Server" subtitle="API · logica" optional className="min-w-0">
        <ServerIllustration />
        <TechBadgeRow techs={SERVER_TECHS} />
      </DiagramNode>

      <FlowConnector label="query" sublabel="SQL" icon="sql" dashed />

      <DiagramNode title="Database" subtitle="dati salvati" optional className="min-w-0">
        <DatabaseIllustration />
        <div className="mt-1 flex justify-center">
          <TechIcon id="prisma" size={22} />
        </div>
      </DiagramNode>

      <ReturnPathSubgrid />
    </div>
  );
}

function VerticalDiagram() {
  return (
    <div className="flex flex-col items-center lg:hidden">
      <DiagramNode title="Client" subtitle="Browser · utente" className="w-full max-w-xs">
        <BrowserIllustration />
      </DiagramNode>

      <FlowConnector label="HTTPS" sublabel="pagina" icon="https" vertical />

      <DiagramNode title="Frontend" subtitle="UI · pagine · animazioni" accent className="w-full max-w-sm">
        <FrontendIllustration />
        <TechBadgeRow techs={FRONTEND_TECHS} />
      </DiagramNode>

      <FlowConnector label="fetch" sublabel="JSON" icon="json" dashed vertical />

      <DiagramNode title="Server" subtitle="API · logica" optional className="w-full max-w-xs">
        <ServerIllustration />
        <TechBadgeRow techs={SERVER_TECHS} />
      </DiagramNode>

      <FlowConnector label="query" sublabel="SQL" icon="sql" dashed vertical />

      <DiagramNode title="Database" subtitle="dati salvati" optional className="w-full max-w-xs">
        <DatabaseIllustration />
        <div className="mt-1 flex justify-center">
          <TechIcon id="prisma" size={22} />
        </div>
      </DiagramNode>

      <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
        <ConnectorIcon type="response" />
        <span className="text-xs font-semibold">Risposta HTML + dati al client</span>
      </div>
    </div>
  );
}

export function WebArchitectureDiagram() {
  const [isOpen, setIsOpen] = useState(true);
  const detailsId = useId();

  return (
    <section aria-labelledby="web-architecture-title">
      <div className="max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
            Come funziona
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 16 16"
              className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
              aria-hidden
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isOpen ? "Nascondi schema" : "Mostra schema"}
          </button>
        </div>
      </div>

      <div id={detailsId} hidden={!isOpen}>
        <div className="max-w-2xl">
          <h2
            id="web-architecture-title"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Dal click alla risposta: come comunicano le tecnologie
          </h2>
          <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">
            Schema del flusso dati — ogni colonna è un livello del sistema, ogni
            freccia un protocollo reale.
          </p>
        </div>

        <figure
          className="mt-10 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 sm:p-6 lg:p-8"
          role="img"
          aria-label="Schema orizzontale: Client, Frontend, Server, Database collegati da HTTPS, JSON e SQL"
        >
          <HorizontalDiagram />
          <VerticalDiagram />

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-foreground/10 pt-4">
            <span className="inline-flex items-center gap-2 text-[10px] text-foreground/45">
              <span className="h-0.5 w-5 bg-foreground/30" />
              flusso principale
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] text-foreground/45">
              <span className="h-0.5 w-5 border-t border-dashed border-foreground/30" />
              livello opzionale
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] text-foreground/45">
              <span className="h-0.5 w-5 border-t border-dashed border-emerald-500/50" />
              risposta al client
            </span>
          </div>

          <figcaption className="mt-3 text-center text-xs leading-5 text-foreground/45">
            Partiamo sempre dal frontend. API e database si aggiungono solo quando
            servono dati dinamici o persistenza.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
