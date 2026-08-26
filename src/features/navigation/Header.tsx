import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";
import { useAppStore } from "../../store/useAppStore";
import { cn, scrollToSection } from "../../lib/utils";
import { contact, navLinks } from "../../data/company";
import { Container } from "../../components/ui/Container";
import { Logo } from "../../components/ui/Logo";
import { Button } from "../../components/ui/Button";

export function Header() {
  const solid = useScrolled(24);
  const activeSection = useAppStore((state) => state.activeSection);
  const toggleMobileNav = useAppStore((state) => state.toggleMobileNav);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
        solid
          ? "border-b border-line bg-paper/85 backdrop-blur-lg"
          : "border-b border-transparent"
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-18">
          <button
            onClick={() => scrollToSection("hero")}
            className="rounded-lg"
            aria-label="WEIS — back to top"
          >
            <Logo tone={solid ? "light" : "dark"} />
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

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${contact.phoneIntl}`}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:inline-flex",
                solid ? "text-navy hover:text-crimson" : "text-white/85 hover:text-white"
              )}
            >
              <Phone className="h-4 w-4" /> {contact.phone}
            </a>
            <Button
              variant="crimson"
              size="sm"
              onClick={openLeadModal}
              className="hidden sm:inline-flex"
            >
              Free eligibility check
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
