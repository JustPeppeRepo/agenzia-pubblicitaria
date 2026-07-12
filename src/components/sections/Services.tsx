import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Servizi"
        title="Cosa facciamo per i nostri clienti"
        description="Un approccio integrato che unisce strategia, creatività e performance."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20"
          >
            <span className="text-2xl text-foreground/40" aria-hidden>
              {service.icon}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-foreground/65">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
