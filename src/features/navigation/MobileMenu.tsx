import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Sparkles, X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { usePresence } from "../../hooks/usePresence";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { scrollToSection } from "../../lib/utils";
import { contact, navLinks, socials } from "../../data/company";
import { Logo } from "../../components/ui/Logo";
import { Button } from "../../components/ui/Button";

function MobileMenuInner({
  show,
  onClose,
  onLead,
  onExited,
}: {
  show: boolean;
  onClose: () => void;
  onLead: () => void;
  onExited: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(true);

  useEffect(() => {
    const timer = window.setTimeout(() => panelRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const go = (id: string) => {
    onClose();
    window.setTimeout(() => scrollToSection(id), 80);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[75] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col bg-paper shadow-panel outline-none"
        initial={{ x: "100%" }}
        animate={{ x: show ? 0 : "100%" }}
        transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
        onAnimationComplete={() => {
          if (!show) onExited();
        }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo tone="light" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate transition-colors hover:border-crimson hover:text-crimson"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col px-3 py-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="rounded-xl px-3 py-3 text-left font-display text-lg font-semibold text-ink transition-colors hover:bg-cloud hover:text-crimson"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          <Button
            variant="crimson"
            fullWidth
            onClick={() => {
              onClose();
              onLead();
            }}
          >
            <Sparkles className="h-4 w-4" /> Free eligibility check
          </Button>

          <div className="mt-5 flex flex-col gap-3 text-sm text-slate">
            <a
              href={`tel:${contact.phoneIntl}`}
              className="flex items-center gap-3 hover:text-crimson"
            >
              <Phone className="h-4 w-4 text-crimson" /> {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex min-w-0 items-center gap-3 break-all hover:text-crimson"
            >
              <Mail className="h-4 w-4 text-crimson" /> {contact.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
              {contact.address}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy transition-colors hover:border-crimson hover:text-crimson"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MobileMenu() {
  const open = useAppStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen);
  const openLeadModal = useAppStore((state) => state.openLeadModal);
  const { mounted, show, onExited } = usePresence(open);

  if (!mounted) return null;
  return (
    <MobileMenuInner
      show={show}
      onClose={() => setMobileNavOpen(false)}
      onLead={openLeadModal}
      onExited={onExited}
    />
  );
}
