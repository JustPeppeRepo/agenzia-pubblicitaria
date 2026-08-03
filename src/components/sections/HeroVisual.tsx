"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMotionSafe } from "@/hooks/use-motion-safe";
import { cn } from "@/lib/utils";

const CODE_WALL =
  `<section className="hero"><h1>{site.tagline}</h1><Button href="/contact">Inizia</Button></section> export function Page(){return(<main><Hero/><Projects/></main>)} <div className="cta"><a href="#lead">Prenota ora</a></div> const lead=await db.lead.create({data:{source:"seo"}}); <meta name="description" content={seo.description}/> async function getLeads(){return prisma.lead.findMany()} <header><nav aria-label="Principale"/></header> type Site={fast:true;seo:"built-in";ads:"targeted"} export const config={runtime:"nodejs"} <article className="project-card"><Image src={cover} alt=""/><h2>{title}</h2></article> const conversion=leads.filter(l=>l.status==="won").length <form action={submitLead}><input name="email" required/></form> import {PrismaClient} from "@prisma/client" export default function Layout({children}:{children:React.ReactNode}){return(<html><body>{children}</body></html>)} <ul className="stack">{techs.map(t=><li key={t.id}>{t.name}</li>)}</ul> await fetch("/api/contact",{method:"POST",body:JSON.stringify(data)}) <footer><a href="mailto:studio@aiello.it">Contatti</a></footer> const scores={lcp:0.8,cls:0.01,seo:100} <button type="submit" className="btn-primary">Richiedi preventivo</button> function cn(...c:(string|false|undefined)[]){return c.filter(Boolean).join(" ")} <link rel="canonical" href={site.url}/> export async function generateMetadata(){return{title:site.name}} <main id="content"><AboutBrief/><ValueProposition/></main> const roi=((revenue-spend)/spend)*100 <script type="application/ld+json">{JSON.stringify(schema)}</script> `;

/**
 * Hero right-rail: traffic → professional site → conversion.
 * Flex layout avoids overlap on small screens; infinite motion
 * pauses when off-screen and is reduced under md / prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [isMdUp, setIsMdUp] = useState(false);
  const live = shouldAnimate && inView;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "relative flex aspect-4/5 w-full flex-col gap-2 overflow-hidden rounded-3xl border border-foreground/10 bg-background/55 p-3 shadow-sm sm:gap-3 sm:p-4",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-45" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 75% 12%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 70%), radial-gradient(ellipse 55% 45% at 8% 88%, color-mix(in srgb, var(--spark) 26%, transparent), transparent 68%), radial-gradient(ellipse 50% 40% at 48% 48%, color-mix(in srgb, var(--accent-2) 18%, transparent), transparent 65%)",
        }}
      />

      {/* Faint code texture — continuous wall that fills the card */}
      <pre className="pointer-events-none absolute inset-0 m-0 h-full w-full overflow-hidden whitespace-normal break-all p-3 font-mono text-[9px] leading-[1.35] text-foreground/[0.055] select-none sm:p-4 sm:text-[10px] dark:text-foreground/[0.07]">
        <code className="block min-h-full">
          {CODE_WALL.repeat(8)}
        </code>
      </pre>

      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 400 500"
        fill="none"
      >
        <path
          d="M70 70 C 110 120, 130 180, 165 230"
          stroke="color-mix(in srgb, var(--accent) 55%, transparent)"
          strokeWidth="2"
          strokeDasharray="5 6"
          className={cn(live && isMdUp && "hero-dash-flow")}
        />
        <path
          d="M330 78 C 295 130, 265 180, 235 230"
          stroke="color-mix(in srgb, var(--accent-2) 55%, transparent)"
          strokeWidth="2"
          strokeDasharray="5 6"
          className={cn(live && isMdUp && "hero-dash-flow-rev")}
        />
        <path
          d="M200 310 C 200 345, 230 370, 268 400"
          stroke="color-mix(in srgb, var(--spark) 60%, transparent)"
          strokeWidth="2"
          strokeDasharray="5 6"
          className={cn(live && isMdUp && "hero-dash-flow")}
        />
        <circle cx="165" cy="230" r="3.5" className="fill-accent" />
        <circle cx="235" cy="230" r="3.5" className="fill-accent-2" />
        <circle cx="268" cy="400" r="3.5" className="fill-spark" />
      </svg>

      {/* Top: traffic */}
      <div className="relative z-10 flex shrink-0 items-start justify-between gap-2">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={cn(
            "max-w-[48%] rounded-2xl border border-accent/30 bg-background/85 p-2 shadow-md backdrop-blur-sm sm:p-2.5",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent sm:size-8">
              <SearchIcon />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
                SEO
              </p>
              <p className="truncate text-[11px] font-semibold leading-tight text-foreground/90">
                In 1ª pagina
              </p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-accent/10 px-2 py-1 sm:mt-2">
            <span
              className={cn(
                "size-1.5 rounded-full bg-accent",
                live && "hero-pulse",
              )}
            />
            <span className="font-mono text-[9px] font-medium text-accent">
              traffico organico ↑
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className={cn(
            "max-w-[48%] rounded-2xl border border-accent-2/30 bg-background/85 p-2 shadow-md backdrop-blur-sm sm:p-2.5",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-accent-2/15 text-accent-2 sm:size-8">
              <TargetIcon />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-2">
                Ads
              </p>
              <p className="truncate text-[11px] font-semibold leading-tight text-foreground/90">
                Click qualificati
              </p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-1 rounded-lg bg-accent-2/10 px-2 py-1 font-mono text-[9px] font-medium text-accent-2 sm:mt-2">
            <span>CPA ↓</span>
            <span>ROAS ↑</span>
          </div>
        </motion.div>
      </div>

      {/* Center: site mock — flex-1 keeps it centered without overlapping */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-0.5">
        <motion.div
          className="w-full max-w-[92%]"
          initial={shouldAnimate ? { opacity: 0, y: 14, scale: 0.98 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-foreground/15 bg-background/90 shadow-lg shadow-foreground/10 ring-1 ring-accent/10 backdrop-blur-sm",
              live && "hero-float-c",
            )}
          >
            <div className="flex items-center gap-1.5 border-b border-foreground/8 bg-foreground/4 px-2.5 py-1.5">
              <span className="size-1.5 rounded-full bg-accent-2/80" />
              <span className="size-1.5 rounded-full bg-spark/80" />
              <span className="size-1.5 rounded-full bg-accent/80" />
              <div className="ml-1.5 flex flex-1 items-center gap-1 rounded-md bg-foreground/6 px-2 py-0.5">
                <LockIcon />
                <span className="truncate font-mono text-[9px] text-foreground/50">
                  https://tuobrand.it
                </span>
              </div>
            </div>

            <div className="relative px-3 pb-2.5 pt-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-tight text-foreground/80">
                  Brand
                </span>
                <div className="flex gap-1">
                  <span className="h-1 w-4 rounded-full bg-foreground/15" />
                  <span className="h-1 w-4 rounded-full bg-foreground/15" />
                  <span className="h-1 w-5 rounded-full bg-accent/50" />
                </div>
              </div>

              <div className="mb-2 overflow-hidden rounded-xl bg-gradient-to-br from-accent/25 via-accent-2/15 to-spark/20 p-2.5 ring-1 ring-foreground/8">
                <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-accent-2">
                  Sito professionale
                </p>
                <p className="mt-1 text-[12px] font-semibold leading-snug text-foreground/90">
                  Visibile. Veloce. Che converte.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "relative rounded-full bg-accent px-2.5 py-1 text-[9px] font-semibold text-accent-foreground shadow-md shadow-accent/30",
                      live && "hero-cta-glow",
                    )}
                  >
                    Prenota ora
                    <motion.span
                      className="pointer-events-none absolute -right-3 top-[110%] text-foreground"
                      initial={false}
                      animate={
                        live
                          ? {
                              x: [10, 0, 0, 10],
                              y: [8, -2, -2, 8],
                              scale: [1, 1, 0.85, 1],
                            }
                          : { x: 0, y: 0 }
                      }
                      transition={
                        live
                          ? {
                              duration: 2.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              times: [0, 0.38, 0.52, 1],
                            }
                          : undefined
                      }
                    >
                      <CursorIcon />
                    </motion.span>
                  </span>
                  <span className="flex items-center gap-0.5 text-[8px] text-spark">
                    ★★★★★
                    <span className="ml-0.5 text-foreground/45">4.9</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-foreground/8 bg-foreground/3 px-1.5 py-1">
                <FunnelStep label="Visita" tone="accent" active />
                <Chevron />
                <FunnelStep label="Interesse" tone="accent-2" active />
                <Chevron />
                <FunnelStep label="Lead" tone="spark" active />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: proof */}
      <div className="relative z-10 flex shrink-0 items-stretch gap-2">
        <motion.div
          className="w-[38%] shrink-0"
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <div className="h-full rounded-2xl border border-foreground/12 bg-background/85 p-2 shadow-md backdrop-blur-sm sm:p-2.5">
            <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
              Velocità
            </p>
            <div className="flex items-center gap-2">
              <ScoreRing value={98} />
              <div className="min-w-0 space-y-0.5">
                <StatLine label="LCP" value="0.8s" />
                <StatLine label="SEO" value="100" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="min-w-0 flex-1"
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34 }}
        >
          <div className="h-full rounded-2xl border border-spark/30 bg-background/85 p-2 shadow-md backdrop-blur-sm sm:p-2.5">
            <div className="mb-1 flex items-center justify-between gap-1">
              <div className="min-w-0">
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                  Risultato
                </p>
                <p className="truncate text-[11px] font-semibold text-foreground/90">
                  Richieste in aumento
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-md bg-spark/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-spark",
                  live && "hero-lead-pulse",
                )}
              >
                +1 lead
              </span>
            </div>
            <ConversionChart animate={shouldAnimate} />
            <div className="mt-1.5 flex items-center justify-between">
              <div className="flex gap-1">
                <Tag>ROI</Tag>
                <Tag>Fatturato</Tag>
              </div>
              <span className="font-mono text-[11px] font-bold text-accent">
                +47%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FunnelStep({
  label,
  tone,
  active,
}: {
  label: string;
  tone: "accent" | "accent-2" | "spark";
  active?: boolean;
}) {
  const tones = {
    accent: "bg-accent/20 text-accent ring-accent/30",
    "accent-2": "bg-accent-2/20 text-accent-2 ring-accent-2/30",
    spark: "bg-spark/20 text-spark ring-spark/30",
  } as const;

  return (
    <span
      className={cn(
        "flex-1 rounded-md px-1 py-1 text-center text-[8px] font-semibold tracking-wide ring-1",
        active ? tones[tone] : "bg-foreground/5 text-foreground/35 ring-transparent",
      )}
    >
      {label}
    </span>
  );
}

function Chevron() {
  return (
    <span className="shrink-0 text-[8px] text-foreground/30" aria-hidden>
      →
    </span>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);

  return (
    <div className="relative size-9 shrink-0">
      <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="color-mix(in srgb, var(--foreground) 10%, transparent)"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-accent">
        {value}
      </span>
    </div>
  );
}

function ConversionChart({ animate }: { animate: boolean }) {
  const bars = [30, 38, 34, 52, 48, 66, 60, 80, 74, 96];

  return (
    <div className="flex h-8 items-end gap-0.5 sm:h-9">
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-[2px] bg-gradient-to-t from-spark/40 to-accent/75",
            animate && "hero-bar-rise",
          )}
          style={{
            height: `${h}%`,
            animationDelay: animate ? `${0.45 + i * 0.04}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 text-[8px]">
      <span className="text-foreground/40">{label}</span>
      <span className="font-mono font-semibold text-accent">{value}</span>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-foreground/10 bg-foreground/4 px-1 py-0.5 text-[7px] font-semibold uppercase tracking-wider text-foreground/50">
      {children}
    </span>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor">
      <circle cx="7" cy="7" r="4" strokeWidth="1.5" />
      <path d="M10.5 10.5 14 14" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor">
      <circle cx="8" cy="8" r="5.5" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2.5" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="size-2.5 shrink-0 text-accent"
      fill="currentColor"
    >
      <path d="M6 1.5a2 2 0 0 0-2 2V5h1V3.5a1 1 0 0 1 2 0V5h1V3.5a2 2 0 0 0-2-2Z" />
      <rect x="2.5" y="5" width="7" height="5.5" rx="1.2" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 drop-shadow-md" fill="currentColor">
      <path d="M4.5 2.5 19 11.2l-6.1 1.4 2.8 7.3-2.6 1-2.8-7.2L4.5 2.5Z" />
    </svg>
  );
}
