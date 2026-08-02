import { getBrandIcon } from "@/lib/brand-icons";

const cursorIcon = getBrandIcon("cursor");

function CursorLogo() {
  if (!cursorIcon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className="text-foreground"
      fill="currentColor"
      aria-label={cursorIcon.title}
    >
      <path d={cursorIcon.path} />
    </svg>
  );
}

export function CursorAiHighlight() {
  return (
    <aside className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/5">
          <CursorLogo />
        </span>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Moltiplicatore di produttività
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Cursor — sviluppo con l&apos;IA al fianco
          </h3>
          <p className="mt-3 text-sm leading-6 text-foreground/65 sm:text-base">
            L&apos;intelligenza artificiale integrata nel mio flusso di lavoro
            accelera ogni fase del progetto: dal primo prototipo al codice in
            produzione. È come avere un team di venti specialisti che lavorano
            in parallelo — architettura, revisione, test e ottimizzazioni
            contemporaneamente. Per te significa tempi più rapidi e un
            risultato curato nei dettagli, senza compromessi sulla qualità.
          </p>
        </div>
      </div>
    </aside>
  );
}
