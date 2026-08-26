import { ArrowRight, Check } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { services } from "../../data/services";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/utils";
import type { Accent } from "../../types";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const ACCENT: Record<Accent, { icon: string; ring: string }> = {
  crimson: { icon: "bg-crimson/10 text-crimson", ring: "hover:border-crimson/40" },
  gold: { icon: "bg-gold/15 text-amber", ring: "hover:border-gold/50" },
  royal: { icon: "bg-royal/10 text-royal", ring: "hover:border-royal/40" },
  navy: { icon: "bg-navy/10 text-navy", ring: "hover:border-navy/40" },
};

export function ServicesSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <section id="services" className="bg-cloud py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="What we do"
          title="Four ways WEIS moves you abroad"
          description="Whatever your goal, one dedicated team handles it end-to-end — with honest advice before you spend a single taka."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            const accent = ACCENT[service.accent];
            return (
              <RevealItem key={service.id} variants={fadeUp} className="h-full">
                <div
                  className={cn(
                    "group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                    accent.ring
                  )}
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      accent.icon
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-crimson">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-ink"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openLeadModal}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-crimson"
                  >
                    Start this route
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
