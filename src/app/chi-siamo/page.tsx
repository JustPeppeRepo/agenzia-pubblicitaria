import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "La storia e i valori del nostro studio creativo.",
};

const values = [
  {
    title: "Strategia prima di tutto",
    description:
      "Ogni progetto nasce da un'analisi approfondita del brand, del mercato e degli obiettivi.",
  },
  {
    title: "Creatività concreta",
    description:
      "Idee originali che si traducono in risultati misurabili per il business del cliente.",
  },
  {
    title: "Partnership duratura",
    description:
      "Lavoriamo fianco a fianco con i clienti, costruendo relazioni basate sulla fiducia.",
  },
];

export default function ChiSiamoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Studio"
        title={`Chi è ${siteConfig.name}`}
        description="Siamo un team di creativi, strategist e specialisti digitali con sede a Milano. Da oltre dieci anni aiutiamo brand di ogni dimensione a comunicare in modo efficace e distintivo."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article
            key={value.title}
            className="rounded-2xl border border-foreground/10 p-6"
          >
            <h2 className="text-lg font-semibold">{value.title}</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/65">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
