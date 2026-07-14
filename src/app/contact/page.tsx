import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contattami per discutere il tuo prossimo progetto web.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <FadeIn>
          <SectionHeading
            eyebrow="Contatti"
            title="Parliamo del tuo prossimo progetto"
            description="Compila il modulo con validazione client-side, oppure contattami direttamente via email o LinkedIn."
          />
          <SocialLinks className="mt-6" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
