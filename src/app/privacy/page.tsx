/**
 * @file Privacy `/privacy`
 * @description Informativa GDPR sul trattamento dati del form contatti.
 *
 * Components: FadeIn, Link (next/link)
 * Data/API: siteConfig.privacyController
 * Hooks: (nessuno — Server Component)
 */
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sulla privacy e sul trattamento dei dati personali ai sensi del GDPR.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "Come trattiamo i dati personali raccolti tramite il form di contatto.",
    url: "/privacy",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "Come trattiamo i dati personali raccolti tramite il form di contatto.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const { firstName, lastName, email } = siteConfig.privacyController;
  const controllerName = `${firstName} ${lastName}`.trim();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Informativa sulla privacy
        </h1>
        <p className="mt-4 text-sm text-foreground/55">
          Ultimo aggiornamento: agosto 2026
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10 space-y-8 text-sm leading-7 text-foreground/75 sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              1. Titolare del trattamento
            </h2>
            <p>
              Il Titolare del trattamento dei dati personali è{" "}
              <strong className="font-medium text-foreground">
                {controllerName}
              </strong>
              , contattabile all&apos;indirizzo email{" "}
              <a
                href={`mailto:${email}`}
                className="text-foreground underline underline-offset-2 transition-colors hover:text-accent"
              >
                {email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              2. Cookie e tracciamento
            </h2>
            <p>
              Questo sito è di natura informativa e{" "}
              <strong className="font-medium text-foreground">
                non utilizza cookie di profilazione né strumenti di tracciamento
                di terze parti
              </strong>{" "}
              (es. Google Analytics, pixel pubblicitari, social tracking).
            </p>
            <p>
              Possono essere usati esclusivamente cookie tecnici strettamente
              necessari al funzionamento del sito (ad esempio preferenze di tema
              salvate localmente sul dispositivo). Tali cookie non richiedono il
              consenso ai sensi della normativa vigente.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              3. Dati raccolti tramite il form di contatto
            </h2>
            <p>
              Compilando il form di contatto su questo sito, l&apos;utente
              fornisce volontariamente i seguenti dati personali:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Nome</li>
              <li>Indirizzo email</li>
              <li>Messaggio</li>
            </ul>
            <p>
              Questi dati sono trattati{" "}
              <strong className="font-medium text-foreground">
                esclusivamente per rispondere alla richiesta
              </strong>{" "}
              dell&apos;utente e per eventuali comunicazioni successive legate a
              quella richiesta. Non vengono utilizzati per finalità di marketing
              automatico, profilazione o newsletter, salvo diverso consenso
              esplicito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              4. Base giuridica
            </h2>
            <p>
              Il trattamento si basa sull&apos;esecuzione di misure
              precontrattuali adottate su richiesta dell&apos;interessato
              (art. 6, par. 1, lett. b del Regolamento UE 2016/679 — GDPR) e, ove
              applicabile, sul legittimo interesse a gestire le comunicazioni
              ricevute (art. 6, par. 1, lett. f GDPR).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              5. Destinatari e cessione a terzi
            </h2>
            <p>
              I dati{" "}
              <strong className="font-medium text-foreground">
                non vengono ceduti a terzi per finalità commerciali
              </strong>
              . Possono essere trattati da fornitori tecnici necessari
              all&apos;invio e alla ricezione dei messaggi (ad esempio servizio
              di inoltro email del form), che agiscono come responsabili del
              trattamento o strumentalmente alla consegna della comunicazione,
              nel rispetto della normativa applicabile.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              6. Conservazione
            </h2>
            <p>
              I dati del form di contatto sono conservati per il tempo
              strettamente necessario a gestire la richiesta e, se del caso, il
              rapporto successivo. In assenza di ulteriori interazioni, i
              messaggi possono essere eliminati entro un termine ragionevole
              (indicativamente entro 12 mesi dalla ricezione), salvo obblighi di
              legge diversi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              7. Diritti dell&apos;interessato
            </h2>
            <p>
              Ai sensi degli artt. 15–22 del GDPR, l&apos;interessato può
              esercitare in qualsiasi momento i diritti di accesso,
              rettifica, cancellazione, limitazione del trattamento,
              portabilità e opposizione, nonché il diritto di proporre reclamo
              all&apos;Autorità Garante per la protezione dei dati personali (
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 transition-colors hover:text-accent"
              >
                www.garanteprivacy.it
              </a>
              ).
            </p>
            <p>
              Per esercitare i propri diritti è sufficiente scrivere a{" "}
              <a
                href={`mailto:${email}`}
                className="text-foreground underline underline-offset-2 transition-colors hover:text-accent"
              >
                {email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              8. Aggiornamenti
            </h2>
            <p>
              Questa informativa può essere aggiornata in caso di modifiche al
              sito o alla normativa. La versione pubblicata su questa pagina è
              quella vigente.
            </p>
          </section>

          <p className="pt-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground underline underline-offset-2 transition-colors hover:text-accent"
            >
              Torna al form di contatto
            </Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
