import { HeroSection } from "../components/sections/HeroSection";
import { TrustMarqueeSection } from "../components/sections/TrustMarqueeSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { DestinationsSection } from "../components/sections/DestinationsSection";
import { ProgramsSection } from "../components/sections/ProgramsSection";
import { WhyWeisSection } from "../components/sections/WhyWeisSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { StatsSection } from "../components/sections/StatsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { FaqSection } from "../components/sections/FaqSection";
import { CtaSection } from "../components/sections/CtaSection";
import { ContactSection } from "../components/sections/ContactSection";
import { OfficeSection } from "../components/sections/OfficeSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMarqueeSection />
      <ServicesSection />
      <DestinationsSection />
      <ProgramsSection />
      <WhyWeisSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <OfficeSection />
    </>
  );
}
