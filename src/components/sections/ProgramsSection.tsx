import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { featuredPrograms, malaysiaJobCategories } from "../../data/programs";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/utils";
import type { Accent, Program } from "../../types";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Button } from "../ui/Button";

const ACCENT_TEXT: Record<Accent, string> = {
  crimson: "text-crimson-soft",
  gold: "text-gold-soft",
  royal: "text-royal-soft",
  navy: "text-mist",
};

function ProgramCard({
  program,
  onApply,
}: {
  program: Program;
  onApply: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-white/20 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {program.flag}
        </span>
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-[0.14em]",
            ACCENT_TEXT[program.accent]
          )}
        >
          {program.kicker}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold text-white">
        {program.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{program.summary}</p>
      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {program.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-2 text-sm text-white/90"
          >
            <Check
              className={cn("mt-0.5 h-4 w-4 shrink-0", ACCENT_TEXT[program.accent])}
            />
            {highlight}
          </li>
        ))}
      </ul>
      <Button variant="crimson" onClick={onApply} className="mt-6 w-full">
        Check my eligibility <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function ProgramsSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);
  const [malaysia, canada, study] = featuredPrograms;

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-crimson/20 blur-[130px]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          tone="dark"
          label="Live campaigns · 2026"
          title="Featured programs & job openings"
          description="Real, current WEIS campaigns — from legal work in Malaysia to Master's study in Canada. Take the eligibility check and we'll tell you exactly where you stand."
        />

        {/* Malaysia spotlight */}
        <Reveal className="mt-14" variants={fadeUp}>
          <div className="grid gap-8 rounded-[2rem] border border-crimson/30 bg-gradient-to-br from-crimson/15 via-white/5 to-transparent p-6 sm:p-9 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-4xl" aria-hidden="true">
                  {malaysia.flag}
                </span>
                <span className="rounded-full bg-crimson px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {malaysia.kicker}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-extrabold text-white">
                {malaysia.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
                {malaysia.summary}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {malaysia.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-white/90"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button
                variant="crimson"
                size="lg"
                onClick={openLeadModal}
                className="mt-7 w-full sm:w-auto"
              >
                <Sparkles className="h-5 w-5" /> Apply for Malaysia jobs
              </Button>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft">
                10+ job categories
              </p>
              <RevealGroup
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                stagger={0.04}
              >
                {malaysiaJobCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <RevealItem key={category.id} variants={fadeUp}>
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-mist transition-colors hover:border-gold/40 hover:text-white">
                        <Icon className="h-4 w-4 shrink-0 text-gold" />
                        <span className="truncate">{category.label}</span>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </Reveal>

        {/* Supporting programs */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2">
          <RevealItem variants={fadeUp} className="h-full">
            <ProgramCard program={canada} onApply={openLeadModal} />
          </RevealItem>
          <RevealItem variants={fadeUp} className="h-full">
            <ProgramCard program={study} onApply={openLeadModal} />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
