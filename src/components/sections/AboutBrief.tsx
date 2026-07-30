import { aboutTeam } from "@/data/site";
import { featuredTechnologies } from "@/data/technologies";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { TeamImageAnchor } from "@/components/sections/TeamScrollBridge";
import { TechIcon } from "@/components/ui/TechIcon";
import { LayeredWaves } from "@/components/decor/LayeredWaves";

export function AboutBrief() {
  return (
    <section className="relative -mt-10 overflow-hidden sm:-mt-14">
      {/* Hero → wash: niente ink, zona onde trasparente */}
      <LayeredWaves
        placement="top"
        from="background"
        to="warm"
        className="relative z-10"
      />

      <div className="bg-warm-wash relative -mt-10 sm:-mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <FadeIn>
            <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-2">
                {aboutTeam.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {aboutTeam.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/65 sm:text-lg">
                {aboutTeam.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-8 sm:gap-y-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
              <div className="mx-auto w-full max-w-[220px] sm:mx-0 sm:row-span-2 sm:w-[150px] sm:max-w-none lg:col-start-2 lg:row-span-1 lg:row-start-1 lg:w-auto lg:max-w-[320px]">
                <TeamImageAnchor variant="about" priority />
              </div>

              <div className="text-left sm:col-start-2 sm:row-start-1 lg:col-start-1 lg:row-start-1 lg:text-right">
                <h3 className="text-base font-semibold tracking-tight text-foreground/90 sm:text-lg">
                  {aboutTeam.left.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65 sm:mt-3 sm:text-base sm:leading-7">
                  {aboutTeam.left.description}
                </p>
              </div>

              <div className="text-left sm:col-start-2 sm:row-start-2 lg:col-start-3 lg:row-start-1">
                <h3 className="text-base font-semibold tracking-tight text-foreground/90 sm:text-lg">
                  {aboutTeam.right.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65 sm:mt-3 sm:text-base sm:leading-7">
                  {aboutTeam.right.description}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-16">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-accent-2">
              Stack principale
            </p>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {featuredTechnologies.map((tech) => (
                <StaggerItem key={tech.id}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tech.name} — sito ufficiale`}
                    className="group flex flex-col items-center rounded-2xl border border-foreground/10 bg-background/70 p-4 text-center transition-colors hover:border-accent/30 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                  >
                    <TechIcon
                      id={tech.id}
                      fallback={tech.icon}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span className="mt-2 text-xs font-medium text-foreground/80">
                      {tech.name}
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </div>

      {/* Wash → sfondo tema: verso la sezione confronto */}
      <LayeredWaves
        placement="bottom"
        from="background"
        to="warm"
        className="relative z-10 -mt-10 sm:-mt-12"
      />
    </section>
  );
}
