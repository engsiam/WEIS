import { processSteps } from "../../data/process";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function ProcessSection() {
  return (
    <section id="process" className="bg-paper py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="How it works"
          title="From first call to landing — in 5 steps"
          description="A clear, guided journey with one dedicated advisor and no surprises along the way."
        />

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          <RevealGroup
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
            stagger={0.1}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealItem
                  key={step.id}
                  variants={fadeUp}
                  className="relative text-center lg:text-left"
                >
                  <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-navy text-white shadow-card lg:mx-0">
                    <Icon className="h-7 w-7" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-crimson text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
