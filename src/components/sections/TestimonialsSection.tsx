import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

export function TestimonialsSection() {
  return (
    <section className="bg-cloud py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="Client stories"
          title="Journeys we've helped begin"
          description="A glimpse of the students, workers and families WEIS supports on their way abroad."
        />

        <RevealGroup
          className="mt-14 grid gap-5 lg:grid-cols-3"
          stagger={0.09}
        >
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} variants={fadeUp} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                <Quote className="h-8 w-8 text-crimson/25" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-slate">
                      {testimonial.route} · {testimonial.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 text-center">
          <p className="text-xs text-mist-dim">
            Illustrative examples — real, consented client stories will be added
            at launch.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
