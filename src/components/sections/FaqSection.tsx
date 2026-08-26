import { MessageCircle } from "lucide-react";
import { contact } from "../../data/company";
import { faqs } from "../../data/faqs";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function FaqSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading
          align="center"
          label="Questions & answers"
          title="Everything you want to know"
          description="Straight answers on cost, IELTS, the Malaysia visa, family applications and timelines."
        />

        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>

        <Reveal className="mt-8" delay={0.1}>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-cloud px-6 py-5 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-base font-bold text-ink">
                Still have a question?
              </p>
              <p className="mt-1 text-sm text-slate">
                Chat with a WEIS advisor — we usually reply within minutes.
              </p>
            </div>
            <Button
              variant="navy"
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
