import { whyPoints } from "../../data/why";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function WhyWeisSection() {
  return (
    <section id="why" className="bg-cloud py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="Why WEIS"
          title="Premium guidance, at minimal cost"
          description="We built WEIS to remove the hassle, guesswork and hidden fees from going abroad — with honest advice you can actually trust."
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {whyPoints.map((point) => (
            <RevealItem key={point.id} variants={fadeUp} className="h-full">
              <div className="group h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-crimson/30 hover:shadow-card">
                <span className="font-display text-4xl font-extrabold text-crimson/20 transition-colors group-hover:text-crimson/40">
                  {point.index}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {point.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
