import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { ArrowRight, BadgeCheck, Plane, Sparkles } from "lucide-react";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { hasSeenIntro } from "../../lib/intro";
import { scrollToSection } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { company } from "../../data/company";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { WorldMap } from "../ui/WorldMap";
import { FlagChip } from "../ui/FlagChip";
import { PassportStamp } from "../ui/PassportStamp";
import { Logo } from "../ui/Logo";
import { Magnetic } from "../animations/Magnetic";

const trustPoints = [
  "Honest eligibility",
  "Premium guidance",
  "Minimal cost",
];

/**
 * Masked headline lines rise in sequence — calm, heavy, expensive. The whole
 * choreography is offset by the intro-curtain duration on first visits so
 * the reveal is never hidden behind the preloader.
 */
const headLine = (base: number): Variants => ({
  hidden: { y: "115%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.05,
      ease: EASE_OUT_EXPO,
      delay: base + 0.38 + i * 0.15,
    },
  }),
});

const softRise = (base: number, delay: number): Variants => ({
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: base + delay },
  },
});

export function HeroSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);
  const sectionRef = useRef<HTMLElement>(null);
  /* First session visit → the intro veil plays; hold the entrance until it lifts. */
  const [introBase] = useState(() => (hasSeenIntro() ? 0 : 1.15));

  /* Scroll-linked parallax — background drifts down, foreground lifts. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-navy pb-16 pt-28 text-white sm:pt-32"
    >
      {/* Background layers */}
      <motion.div
        className="world-dots absolute inset-0 opacity-70"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <motion.div
        style={{ y: mapY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <WorldMap className="absolute right-0 top-1/2 h-[130%] w-[70%] -translate-y-1/2 opacity-60" />
      </motion.div>
      <div
        className="animate-drift absolute -left-24 top-10 h-96 w-96 rounded-full bg-crimson/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="animate-drift-slow absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-royal/25 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-gold/10 blur-[100px]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: introBase + 0.18 }}
            >
              <SectionLabel tone="dark">
                {company.countries} countries · one trusted team
              </SectionLabel>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  custom={0}
                  variants={headLine(introBase)}
                  className="block will-change-transform"
                >
                  Your gateway to global
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.14em] -mb-[0.1em]">
                <motion.span
                  custom={1}
                  variants={headLine(introBase)}
                  className="block bg-gradient-to-r from-crimson-soft via-gold-soft to-gold bg-clip-text text-transparent will-change-transform"
                >
                  study, work &amp; migration
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={softRise(introBase, 0.82)}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            >
              {company.statement}
            </motion.p>

            {/* CTAs enter last — the curtain-lift moment. */}
            <motion.div
              variants={softRise(introBase, 1.02)}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button
                  variant="crimson"
                  size="lg"
                  onClick={openLeadModal}
                  className="w-full justify-center px-6 sm:w-auto sm:px-8"
                >
                  <Sparkles className="h-5 w-5" /> Check your eligibility — free
                </Button>
              </Magnetic>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => scrollToSection("services")}
                className="w-full justify-center px-6 sm:w-auto sm:px-8"
              >
                Explore services <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.ul
              variants={softRise(introBase, 1.2)}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-mist"
                >
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — boarding-pass visual (parallax wrapper + entrance) */}
          <motion.div style={{ y: visualY }} className="md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: EASE_OUT_EXPO,
                delay: introBase + 0.55,
              }}
              className="relative mx-auto hidden w-full max-w-md md:block"
            >
            <PassportStamp
              label="VISA"
              sub="APPROVED"
              rotate={-14}
              className="absolute -left-5 -top-6 z-20"
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-3xl bg-white/95 p-6 text-ink shadow-panel backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <Logo tone="light" />
                <span className="rounded-full bg-crimson/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-crimson">
                  Boarding pass
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    From
                  </p>
                  <p className="font-display text-2xl font-extrabold text-navy">
                    DAC
                  </p>
                  <p className="text-xs text-slate">Dhaka</p>
                </div>
                <div className="flex flex-1 items-center px-3">
                  <span className="h-px flex-1 bg-line" />
                  <Plane className="mx-1 h-5 w-5 rotate-90 text-crimson" />
                  <span className="h-px flex-1 bg-line" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    To
                  </p>
                  <p className="font-display text-2xl font-extrabold text-navy">
                    YYZ
                  </p>
                  <p className="text-xs text-slate">Toronto</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-line pt-4 text-xs">
                <div>
                  <p className="font-semibold uppercase tracking-wide text-slate">
                    Passenger
                  </p>
                  <p className="mt-0.5 font-bold text-ink">You</p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wide text-slate">
                    Route
                  </p>
                  <p className="mt-0.5 font-bold text-ink">Study · MOI</p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wide text-slate">
                    Status
                  </p>
                  <p className="mt-0.5 font-bold text-crimson">Confirmed</p>
                </div>
              </div>

              <div className="mt-5 flex gap-[3px]" aria-hidden="true">
                {Array.from({ length: 42 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-8 w-[3px] bg-navy"
                    style={{ opacity: index % 3 === 0 ? 1 : index % 2 ? 0.35 : 0.7 }}
                  />
                ))}
              </div>
            </motion.div>

            <FlagChip
              flag="🇨🇦"
              label="Canada"
              className="absolute -right-4 top-1/3 z-20 shadow-lift"
            />
            <FlagChip
              flag="🇲🇾"
              label="Malaysia"
              className="absolute -bottom-4 left-6 z-20 shadow-lift"
            />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
