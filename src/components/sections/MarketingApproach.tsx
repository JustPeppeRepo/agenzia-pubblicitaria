import { SectionHeading } from "@/components/ui/SectionHeading";

export function MarketingApproach() {
  return (
    <div className="max-w-3xl">
      <SectionHeading
        eyebrow="Come funziona"
        title="Dal messaggio alla conversione: come lavoriamo la visibilità"
        description="Ogni canale ha un ruolo preciso nel percorso dell'utente — dalla prima ricerca su Google al click sull'annuncio, fino alla landing page che convince."
      />

      <ol className="mt-10 space-y-6">
        {[
          {
            step: "01",
            title: "Ricerca e posizionamento",
            body: "Analizziamo come il tuo pubblico cerca i tuoi servizi. SEO on-page, struttura dei contenuti e keyword strategy per comparire dove conta.",
          },
          {
            step: "02",
            title: "Campagne mirate",
            body: "Google Ads e Meta Ads con budget ottimizzato: annunci testati, audience segmentate e messaggi allineati alla landing page.",
          },
          {
            step: "03",
            title: "Landing e conversione",
            body: "Il traffico arriva su pagine progettate per convertire — headline chiare, prove sociali, CTA visibili. Ogni visita ha un obiettivo misurabile.",
          },
          {
            step: "04",
            title: "Misurazione e ottimizzazione",
            body: "Analytics e tracking conversioni per capire cosa funziona. Iteriamo su creatività, copy e targeting in base ai dati reali.",
          },
        ].map((item) => (
          <li
            key={item.step}
            className="flex gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5"
          >
            <span className="shrink-0 text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {item.step}
            </span>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-foreground/65">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
