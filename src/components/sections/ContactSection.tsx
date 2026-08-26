import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, contact, socials } from "../../data/company";
import { fadeUp } from "../../lib/motion";
import { ContactForm } from "../../features/enquiry/ContactForm";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const CONTACT_ITEMS = [
  {
    id: "phone",
    icon: Phone,
    label: "Call us",
    value: contact.phone,
    href: `tel:${contact.phoneIntl}`,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.phone,
    href: contact.whatsappUrl,
    external: true,
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: "address",
    icon: MapPin,
    label: "Visit our office",
    value: contact.address,
  },
  {
    id: "hours",
    icon: Clock,
    label: "Office hours",
    value: contact.hours,
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="bg-cloud py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — details */}
          <div>
            <SectionHeading
              align="left"
              label="Contact"
              title="Let's plan your move abroad"
              description={`Talk to a ${company.shortName} advisor about study, work, migration or tours. Your first consultation is completely free.`}
            />

            <RevealGroup className="mt-10 flex flex-col gap-4" stagger={0.07}>
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-medium text-ink">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <RevealItem key={item.id} variants={fadeUp}>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target={"external" in item ? "_blank" : undefined}
                        rel={"external" in item ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-line hover:bg-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-2">{content}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal className="mt-8" delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate">
                  Follow us
                </span>
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:border-crimson hover:text-crimson"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-panel sm:p-8">
              <h3 className="font-display text-2xl font-bold text-ink">
                Send us a message
              </h3>
              <p className="mt-1.5 text-sm text-slate">
                Fill in the form and we'll get back to you shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
