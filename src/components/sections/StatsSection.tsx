import { stats } from "../../data/stats";
import { fadeUp } from "../../lib/motion";
import { Container } from "../ui/Container";
import { StatCounter } from "../ui/StatCounter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-midnight py-16 text-white">
      <div className="world-dots absolute inset-0 opacity-60" aria-hidden="true" />
      <Container size="wide" className="relative z-10">
        <RevealGroup
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          stagger={0.1}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.id} variants={fadeUp}>
              <StatCounter
                stat={stat}
                tone="dark"
                className="items-center text-center"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
