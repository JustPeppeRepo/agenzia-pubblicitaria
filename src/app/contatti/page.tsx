import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { formatEmailLink, formatPhoneLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contattaci per discutere il tuo prossimo progetto creativo.",
};

export default function ContattiPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contatti"
            title="Parliamo del tuo prossimo progetto"
            description="Compila il modulo o contattaci direttamente. Nessun database: i messaggi possono essere collegati in seguito a un servizio email o a un form provider."
          />

          <ul className="mt-8 space-y-4 text-sm text-foreground/70">
            <li>
              <span className="font-medium text-foreground">Email: </span>
              <a
                href={formatEmailLink(siteConfig.email)}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">Telefono: </span>
              <a
                href={formatPhoneLink(siteConfig.phone)}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <span className="font-medium text-foreground">Sede: </span>
              {siteConfig.address}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
