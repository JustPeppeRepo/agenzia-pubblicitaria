import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects limit={3} showViewAll />
      <ContactCTA />
    </>
  );
}
