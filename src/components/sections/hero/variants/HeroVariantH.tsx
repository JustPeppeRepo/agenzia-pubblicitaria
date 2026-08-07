import { Button } from "@/components/ui/Button";
import { HeroPrimaryCta } from "@/components/sections/hero/HeroPrimaryCta";
import { HeroMockupDeferred } from "@/components/sections/hero/HeroMockupDeferred";
import { IconGlobe } from "@/components/sections/hero/HeroIcons";
import { cn } from "@/lib/utils";

function IconTarget({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-5", className)} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * H — Product mockup: browser in prospettiva + chip SEO/ADS (match reference).
 * Server Component: LCP text/CTAs are SSR HTML; mockup JS loads only on md+.
 */
export function HeroVariantH() {
  return (
    <div className="relative mx-auto grid w-full max-w-6xl flex-1 content-center items-center gap-10 px-6 py-6 md:grid-cols-2 md:gap-12 md:px-8 md:py-8 lg:gap-16 lg:px-10">
      <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left">
        <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-accent-2 sm:text-xs">
          Web development / Digital products
        </p>
        <h1 className="max-w-[12ch] text-[2.75rem] font-semibold uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl md:max-w-[11ch] md:text-[3.35rem] md:normal-case lg:text-[3.75rem]">
          Siti web e pubblicità mirata.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-foreground/60 sm:text-lg sm:leading-8 md:mx-0">
          Progettiamo esperienze digitali veloci, riconoscibili e costruite per
          trasformare attenzione in crescita.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3.5 md:justify-start">
          <HeroPrimaryCta />
          <Button
            href="/#projects"
            variant="secondary"
            className="border-foreground/25 hover:border-foreground/40 hover:bg-foreground/[0.04]"
          >
            Vedi i progetti
          </Button>
        </div>

        <div className="mt-8 w-full max-w-md border-t border-foreground/12 pt-4 md:max-w-none">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-start">
            <li className="flex items-center gap-2 text-sm text-foreground/55">
              <IconGlobe className="size-[1.125rem] shrink-0 text-foreground/45" />
              Performance first
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground/55">
              <IconTarget className="shrink-0 text-foreground/45" />
              Design su misura
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 hidden w-full md:block">
        <HeroMockupDeferred />
      </div>
    </div>
  );
}
