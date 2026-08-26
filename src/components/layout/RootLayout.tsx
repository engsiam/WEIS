import { Outlet } from "@tanstack/react-router";
import { navLinks } from "../../data/company";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useLeadPopup } from "../../hooks/useLeadPopup";
import { Header } from "../../features/navigation/Header";
import { MobileMenu } from "../../features/navigation/MobileMenu";
import { LeadModal } from "../../features/lead/LeadModal";
import { WhatsAppFab } from "../../features/lead/WhatsAppFab";
import { Footer } from "./Footer";

export function RootLayout() {
  useLeadPopup();
  useActiveSection(navLinks);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-crimson focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:shadow-lift"
      >
        Skip to content
      </a>

      <Header />
      <MobileMenu />

      <main id="main">
        <Outlet />
      </main>

      <Footer />

      <LeadModal />
      <WhatsAppFab />
    </>
  );
}
