import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatEmailLink } from "@/lib/utils";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <FadeIn>
        <div className="rounded-3xl border border-foreground/10 bg-foreground p-8 text-background sm:p-12">
          <SectionHeading
            eyebrow="Contatti"
            title="Pronto a costruire qualcosa di eccezionale?"
            description="Raccontami il tuo progetto. Rispondo entro 24 ore lavorative."
            dark
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href={formatEmailLink(siteConfig.email)}
              variant="secondary"
              className="border-background/20 bg-background text-foreground hover:bg-background/90"
            >
              Scrivimi una email
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              className="text-background/80 hover:bg-background/10 hover:text-background"
            >
              Modulo contatti
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
