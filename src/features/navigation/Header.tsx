import { motion } from "motion/react";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useAppStore } from "../../store/useAppStore";
import { cn, scrollToSection } from "../../lib/utils";
import { contact, navLinks } from "../../data/company";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";

export function Header() {
  const solid = useScrolled(24);
  const compact = useScrollDirection(140);
  const activeSection = useAppStore((state) => state.activeSection);
  const toggleMobileNav = useAppStore((state) => state.toggleMobileNav);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
        solid
          ? "border-b border-line bg-paper/85 shadow-card backdrop-blur-lg"
          : "border-b border-transparent"
      )}
    >
      <Container size="wide">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            compact ? "h-14 sm:h-16" : "h-16 sm:h-18"
          )}
        >
          <button
            onClick={() => scrollToSection("hero")}
            className={cn(
              "shrink-0 rounded-lg transition-transform duration-300",
              compact && "scale-95"
            )}
            aria-label="WEIS — back to top"
          >
            <img
              src={solid ? "/logo.png" : "/white-logo.png"}
              alt="WEIS Logo"
              className="h-35 w-auto transition-opacity duration-300"
            />
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "relative text-sm font-semibold transition-colors",
                    solid
                      ? active
                        ? "text-crimson"
                        : "text-slate hover:text-ink"
                      : active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-5 rounded-full bg-crimson"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Number tap → WhatsApp chat (works on desktop, where tel: is dead) */}
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with WEIS on WhatsApp — ${contact.phone}`}
              className={cn(
                "hidden h-10 w-10 place-items-center rounded-full border transition-colors sm:grid xl:hidden",
                solid
                  ? "border-line text-navy hover:border-[#25D366] hover:text-[#25D366]"
                  : "border-white/25 text-white hover:border-[#25D366] hover:text-[#25D366]"
              )}
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:inline-flex",
                solid ? "text-navy hover:text-[#25D366]" : "text-white/85 hover:text-[#25D366]"
              )}
            >
              <MessageCircle className="h-4 w-4" /> {contact.phone}
            </a>
            {/* WhatsApp quick action — MOBILE ONLY (desktop uses the floating FAB) */}
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with WEIS on WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border text-[#25D366] transition-colors hover:border-[#25D366] sm:hidden"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <Button
              variant="crimson"
              size="sm"
              onClick={openLeadModal}
              className="whitespace-nowrap px-3 sm:px-4"
            >
              <span className="sm:hidden">Free check</span>
              <span className="hidden sm:inline">Free eligibility check</span>
            </Button>
            <button
              onClick={toggleMobileNav}
              aria-label="Open menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden",
                solid ? "border-line text-navy" : "border-white/25 text-white"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
