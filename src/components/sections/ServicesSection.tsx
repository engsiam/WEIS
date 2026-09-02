import { ArrowRight, Check } from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useAppStore } from "../../store/useAppStore";
import { services } from "../../data/services";
import type { Accent } from "../../types";
import { cn } from "../../lib/utils";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

interface AccentTheme {
  tile: string;
  pill: string;
  ring: string;
  check: string;
  ghost: string;
  hairline: string;
  spot: string;
}

const THEMES: Record<Accent, AccentTheme> = {
  crimson: {
    tile: "bg-gradient-to-br from-crimson to-crimson-deep text-white shadow-lg shadow-crimson/25",
    pill: "bg-crimson/10 text-crimson",
    ring: "hover:border-crimson/40",
    check: "text-crimson",
    ghost: "group-hover:text-crimson/[0.08]",
    hairline: "from-crimson via-crimson-soft to-gold",
    spot: "216, 31, 42",
  },
  gold: {
    tile: "bg-gradient-to-br from-gold to-amber text-navy shadow-lg shadow-amber/25",
    pill: "bg-gold/15 text-amber",
    ring: "hover:border-gold/50",
    check: "text-amber",
    ghost: "group-hover:text-amber/[0.12]",
    hairline: "from-gold via-gold-soft to-crimson-soft",
    spot: "242, 183, 5",
  },
  royal: {
    tile: "bg-gradient-to-br from-royal to-royal-soft text-white shadow-lg shadow-royal/25",
    pill: "bg-royal/10 text-royal",
    ring: "hover:border-royal/40",
    check: "text-royal",
    ghost: "group-hover:text-royal/[0.09]",
    hairline: "from-royal via-royal-soft to-gold",
    spot: "29, 78, 216",
  },
  navy: {
    tile: "bg-gradient-to-br from-navy to-navy-raised text-white shadow-lg shadow-navy/25",
    pill: "bg-navy/10 text-navy",
    ring: "hover:border-navy/40",
    check: "text-navy",
    ghost: "group-hover:text-navy/[0.07]",
    hairline: "from-navy via-royal to-crimson-soft",
    spot: "11, 29, 58",
  },
};

/**
 * Premium service card. Layered hover sequence: cursor-tracked spotlight
 * fades in, card lifts with accent border, gradient icon tile scales,
 * ghost numeral tints, CTA arrow fills and glides forward.
 */
function ServiceCard({
  service,
  index,
  onStart,
}: {
  service: (typeof services)[number];
  index: number;
  onStart: () => void;
}) {
  const theme = THEMES[service.accent];
  const Icon = service.icon;

  const trackPointer = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <RevealItem variants={fadeUp} className="h-full">
      <article
        onMouseMove={trackPointer}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
          theme.ring
        )}
      >
        {/* Accent hairline reveals on hover */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            theme.hairline
          )}
        />

        {/* Cursor-tracked spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(${theme.spot}, 0.08), transparent 65%)`,
          }}
        />
        {/* Diagonal sheen sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-full top-0 h-full w-1/2 -rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-[left] duration-[900ms] ease-out group-hover:left-[170%]"
        />

        {/* ── Cover image ─────────────────────────────────── */}
        <div className="relative h-40 shrink-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          {/* Soft gradient — keeps the image visible, not text-heavy */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-midnight/15 to-transparent"
          />
          {/* Ghost numeral on the image */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-3 select-none font-display text-4xl font-extrabold leading-none text-white/20 transition-colors duration-500 group-hover:text-white/35"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Card body */}
        <div className="flex min-w-0 flex-1 flex-col px-5 pb-4">
          {/* Icon tile overlaps the cover — title sits beside it */}
          <div className="relative flex items-center gap-3">
            <span
              className={cn(
                "relative z-10 -mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg ring-4 ring-white transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-105",
                theme.tile
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 pt-3">
              <h3 className="truncate font-display text-lg font-bold leading-tight text-ink">
                {service.title}
              </h3>
              <span
                className={cn(
                  "mt-0.5 block whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.12em]",
                  theme.check
                )}
              >
                {service.tagline}
              </span>
            </div>
          </div>

          <p className="relative mt-2.5 line-clamp-2 text-[0.8rem] leading-relaxed text-slate">
            {service.description}
          </p>

          <ul className="relative mt-2.5 flex flex-col gap-1 border-t border-dashed border-line pt-2.5">
            {service.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[0.8rem] text-ink">
                <span
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cloud",
                    theme.check
                  )}
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="relative mx-5 mb-4 mt-auto flex w-[calc(100%-2.5rem)] items-center justify-between gap-3 border-t border-dashed border-line pt-3 text-left"
        >
          <span className="text-sm font-bold text-navy transition-colors duration-300 group-hover:text-crimson">
            Start this route
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-navy transition-all duration-300 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </button>
      </article>
    </RevealItem>
  );
}

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

        <RevealGroup
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onStart={openLeadModal}
            />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
