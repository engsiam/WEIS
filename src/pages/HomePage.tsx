import { HeroSection } from "../components/sections/HeroSection";
import { CinematicJourney } from "../components/sections/CinematicJourney";
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
import { useAppStore } from "../store/useAppStore";

export function HomePage() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <>
      <HeroSection />
      <TrustMarqueeSection />
      <ServicesSection />
      <DestinationsSection />
      <ProgramsSection />
      <WhyWeisSection />
      <CinematicJourney onStart={openLeadModal} />
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
