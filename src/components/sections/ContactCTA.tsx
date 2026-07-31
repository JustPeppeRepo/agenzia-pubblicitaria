import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatEmailLink } from "@/lib/utils";

export function ContactCTA() {
  return (
    <section className="bg-section pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="rounded-3xl border border-accent/20 bg-accent p-8 text-accent-foreground shadow-lg shadow-accent/20 sm:p-12">
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
                className="border-accent-foreground/25 bg-accent-foreground text-accent hover:bg-accent-foreground/90 hover:text-accent"
              >
                Scrivimi una email
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                className="text-accent-foreground/85 hover:bg-accent-foreground/10 hover:text-accent-foreground"
              >
                Modulo contatti
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
