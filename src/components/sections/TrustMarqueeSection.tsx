import { destinations } from "../../data/destinations";
import { Container } from "../ui/Container";
import { Marquee } from "../ui/Marquee";
import { FlagChip } from "../ui/FlagChip";

export function TrustMarqueeSection() {
  return (
    <section className="border-b border-line bg-white py-6">
      <Container size="wide" className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.14em] text-slate">
          Pathways across{" "}
          <span className="text-crimson">100+ countries</span>
        </p>
        <div className="relative flex-1 overflow-hidden">
          <Marquee>
            {destinations.map((destination) => (
              <FlagChip
                key={destination.id}
                flag={destination.flag}
                label={destination.country}
                tone="light"
                className="mr-3"
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
        </div>
      </Container>
    </section>
  );
}
