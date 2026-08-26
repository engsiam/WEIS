import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { processSteps } from "../../data/process";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * One journey step. Its icon lights up (crimson wash + gold ring) once the
 * scroll-driven progress passes its position in the journey (§7).
 */
function JourneyStep({
  progress,
  index,
  total,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  step: (typeof processSteps)[number];
}) {
  const Icon = step.icon;
  const reachStart = Math.max(0, index / total - 0.1);
  const reachEnd = Math.min(1, index / total + 0.05);
  const lit = useTransform(progress, [reachStart, reachEnd], [0, 1]);

  return (
    <RevealItem variants={fadeUp} className="relative text-center lg:text-left">
      <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-navy text-white shadow-card transition-colors duration-500 lg:mx-0">
        {/* Reached-state wash */}
        <motion.span
          style={{ opacity: lit }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-crimson to-crimson-deep"
          aria-hidden="true"
        />
        {/* Reached-state gold ring */}
        <motion.span
          style={{ opacity: lit }}
          className="absolute -inset-1 rounded-[1.15rem] ring-2 ring-gold/70"
          aria-hidden="true"
        />
        <Icon className="relative h-7 w-7" />
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
}

export function ProcessSection(): ReactNode {
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 82%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section id="process" className="bg-paper py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="How it works"
          title="From first call to landing — in 5 steps"
          description="A clear, guided journey with one dedicated advisor and no surprises along the way."
        />

        <div ref={journeyRef} className="relative mt-14">
          {/* Scroll-driven progress rail (desktop journey line) */}
          <div
            className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleX: progress }}
            className="absolute left-[10%] right-[10%] top-8 hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-crimson via-crimson-soft to-gold lg:block"
            aria-hidden="true"
          />

          <RevealGroup
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
            stagger={0.1}
          >
            {processSteps.map((step, index) => (
              <JourneyStep
                key={step.id}
                progress={progress}
                index={index}
                total={processSteps.length}
                step={step}
              />
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
