import { Star } from "lucide-react";
import { destinations } from "../../data/destinations";
import { fadeUp } from "../../lib/motion";
import { cn } from "../../lib/utils";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function DestinationsSection() {
  return (
    <section id="destinations" className="bg-paper py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="Where you can go"
          title="Top destinations, honestly matched"
          description="From MOI-friendly Canada to Malaysia's calling-visa jobs — we point you to the routes that genuinely fit your profile and budget."
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {destinations.map((destination) => (
            <RevealItem key={destination.id} variants={fadeUp} className="h-full">
              <div
                className={cn(
                  "group relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                  destination.featured
                    ? "border-crimson/25 bg-white shadow-card"
                    : "border-line bg-white"
                )}
              >
                {destination.featured && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-crimson/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-crimson">
                    <Star className="h-3 w-3" /> Featured
                  </span>
                )}
                <span className="text-4xl" aria-hidden="true">
                  {destination.flag}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {destination.country}
                </h3>
                <p className="mt-1 text-sm font-semibold text-crimson">
                  {destination.headline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                  {destination.note}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {destination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cloud px-2.5 py-1 text-xs font-medium text-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
