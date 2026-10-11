import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, contact, navLinks, socials } from "../../data/company";
import { scrollToSection } from "../../lib/utils";
import { Logo } from "../ui/Logo";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

const SERVICES = [
  "Study Abroad",
  "Work Visa",
  "IELTS",
  "Tours & Visit Visa",
];

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-midnight text-mist">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-dim">
              {company.statement}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-mist transition-colors hover:border-crimson hover:bg-crimson hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-mist-dim transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="text-left text-sm text-mist-dim transition-colors hover:text-white"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-soft" />
                <span className="text-mist-dim">{contact.address}</span>
              </li>
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-mist-dim transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-crimson-soft" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-mist-dim transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-crimson-soft" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-mist-dim">{contact.hours}</p>
            <div className="mt-5 flex">
              <Button
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="bg-[#25D366] px-4 text-white hover:bg-[#1fb857] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp — {contact.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          size="wide"
          className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-mist-dim sm:flex-row sm:text-left"
        >
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>{company.positioning}</p>
        </Container>
      </div>
    </footer>
  );
}
