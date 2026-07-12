import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatEmailLink } from "@/lib/utils";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-foreground/10 bg-foreground p-8 text-background sm:p-12">
        <SectionHeading
          eyebrow="Contatti"
          title="Hai un progetto in mente?"
          description="Raccontaci la tua idea: ti risponderemo entro 24 ore lavorative."
          className="[&_h2]:text-background [&_p]:text-background/75 [&_p:first-of-type]:text-background/60"
        />

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            href={formatEmailLink(siteConfig.email)}
            variant="secondary"
            className="border-background/20 bg-background text-foreground hover:bg-background/90"
          >
            Scrivici una email
          </Button>
          <Button
            href="/contatti"
            variant="ghost"
            className="text-background/80 hover:bg-background/10 hover:text-background"
          >
            Modulo contatti
          </Button>
        </div>
      </div>
    </section>
  );
}
