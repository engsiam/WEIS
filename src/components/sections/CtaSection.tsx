import { useRef } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useAppStore } from "../../store/useAppStore";
import { company, contact } from "../../data/company";
import { fadeUp, staggerParent } from "../../lib/motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { PassportStamp } from "../ui/PassportStamp";
import { Magnetic } from "../animations/Magnetic";

export function CtaSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);
  const sectionRef = useRef<HTMLElement>(null);

  /* The finale builds as it approaches the centre of the viewport (§15). */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 55%"],
  });
  const copyScale = useTransform(scrollYProgress, [0.1, 1], [0.965, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 1], [0.2, 0.75]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-navy via-royal to-crimson-deep py-20 text-white sm:py-28"
    >
      <div className="world-dots absolute inset-0 opacity-40" aria-hidden="true" />
      <motion.div
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[160px]"
      />
      <div
        className="animate-drift-slow absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-crimson/30 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-gold/20 blur-[120px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute right-8 top-10 hidden lg:block">
        <PassportStamp label="Approved" rotate={-14} />
      </div>

      <Container size="default" className="relative z-10">
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft"
          >
            <Sparkles className="h-3.5 w-3.5" /> Free & no obligation
          </motion.span>

          <motion.div style={{ scale: copyScale }}>
            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl"
            >
              Start your journey to{" "}
              <span className="bg-gradient-to-r from-gold-soft to-gold bg-clip-text text-transparent">
                {company.countries} countries
              </span>{" "}
              today
            </motion.h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
          >
            Take the 60-second eligibility check and get a tailored recommendation
            — or talk to a WEIS advisor right now. Premium guidance, at minimal cost.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button
                variant="gold"
                size="lg"
                onClick={openLeadModal}
                className="w-full sm:w-auto"
              >
                Check my eligibility <ArrowRight className="h-5 w-5" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button
                variant="outline-light"
                size="lg"
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </Button>
            </Magnetic>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-mist-dim">
            Prefer to call? {" "}
            <a
              href={`tel:${contact.phoneIntl}`}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
