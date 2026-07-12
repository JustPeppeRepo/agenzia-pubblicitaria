import { FadeIn } from "@/components/motion/FadeIn";

type CaseStudySectionProps = {
  title: string;
  children: React.ReactNode;
};

export function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <FadeIn className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="text-base leading-7 text-foreground/70">{children}</div>
    </FadeIn>
  );
}
