import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowRight, Plane, Star } from "lucide-react";
import { destinations } from "../../data/destinations";
import type { Destination } from "../../types";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionLabel } from "../ui/SectionLabel";

/* Leading inset that aligns the track with the page container. */
const STAGE_INSET = "pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";

/* ── Card (shared by gallery + grid) ──────────────────────────────── */

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  return (
    <div
      className={
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-panel " +
        (destination.featured
          ? "border-crimson/25 shadow-lift hover:border-crimson/50"
          : "border-line shadow-card hover:border-crimson/30")
      }
    >
      {/* Accent hairline */}
      <span
        aria-hidden="true"
        className={
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-opacity duration-500 " +
          (destination.featured
            ? "from-crimson via-crimson-soft to-gold opacity-100"
            : "from-navy to-royal opacity-0 group-hover:opacity-60")
        }
      />
      {/* Warm tint on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-crimson/[0.05] via-transparent to-gold/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-full top-0 h-full w-1/2 -rotate-12 bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-[left] duration-[900ms] ease-out group-hover:left-[160%]"
      />
      {/* Ghost index numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl font-extrabold leading-none text-navy/[0.05] transition-colors duration-500 group-hover:text-crimson/[0.08]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between">
        <span
          className="inline-block text-5xl drop-shadow-sm transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
          aria-hidden="true"
        >
          {destination.flag}
        </span>
        {destination.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-crimson/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-crimson">
            <Star className="h-3 w-3" /> Featured
          </span>
        )}
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-bold text-ink">
        {destination.country}
      </h3>
      <p className="relative mt-1 text-sm font-semibold text-crimson">
        {destination.headline}
      </p>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-slate">
        {destination.note}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {destination.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-cloud px-3 py-1 text-xs font-medium text-slate transition-colors duration-300 group-hover:bg-navy group-hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover affordance — arrow glides forward */}
      <div className="relative mt-6 flex items-center gap-2 text-sm font-bold text-navy">
        Explore routes
        <ArrowRight className="h-4 w-4 text-crimson transition-transform duration-300 group-hover:translate-x-2" />
      </div>
    </div>
  );
}

/* ── Journey progress rail with a plane marker ────────────────────── */

function JourneyRail({ progress }: { progress: MotionValue<number> }) {
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const planeLeft = useTransform(
    progress,
    [0, 1],
    ["0%", "calc(100% - 1.25rem)"]
  );
  const chapter = useTransform(
    progress,
    (value: number) =>
      String(
        Math.min(
          destinations.length,
          Math.max(1, Math.round(value * (destinations.length - 1)) + 1)
        )
      ).padStart(2, "0")
  );

  return (
    <div className="flex items-center gap-5">
      <div className="font-display text-sm font-bold tabular-nums text-crimson">
        <motion.span>{chapter}</motion.span>
      </div>
      <div className="relative h-px flex-1 bg-line">
        <motion.div
          style={{ width: fillWidth }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-crimson to-gold"
        />
        <motion.div
          style={{ left: planeLeft }}
          className="absolute -top-2.5 text-crimson"
          aria-hidden="true"
        >
          <Plane className="h-5 w-5 rotate-45 drop-shadow-sm" />
        </motion.div>
      </div>
      <div className="text-sm font-semibold tabular-nums text-slate">
        {String(destinations.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */

export function DestinationsSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const horizontalEnabled = isDesktop && !reduceMotion;

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  /* Measure horizontal travel distance in a layout effect so the tall
     wrapper has real height before first paint (no blank flash), then keep
     it fresh via ResizeObserver + font load. */
  useLayoutEffect(() => {
    if (!horizontalEnabled) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(
        Math.max(0, Math.round(track.scrollWidth - window.innerWidth))
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontalEnabled]);

  /* Scroll-linked transforms — direct mapping, zero lag. */
  const { scrollYProgress } = useScroll({ target: pinRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [80, -80]);

  if (horizontalEnabled) {
    return (
      /* NOTE: no `overflow-hidden` here — it would break position:sticky
         and collapse the whole pinned-gallery effect into blank space. */
      <section id="destinations" className="relative bg-paper">
        <div
          ref={pinRef}
          style={{ height: `calc(100vh + ${distance}px)` }}
          className="relative"
        >
          <div className="world-dots-dark sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            {/* Ghost parallax word — counter-drifts for layered depth (§8) */}
            <motion.span
              style={{ x: ghostX }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-14 select-none whitespace-nowrap font-display text-[10rem] font-extrabold uppercase leading-none tracking-tight text-navy/[0.04] xl:text-[13rem]"
            >
              Explore · Discover · Fly
            </motion.span>

            {/* Stage header — keeps the pinned viewport composed */}
            <div
              className={`relative mb-8 flex items-end justify-between gap-8 ${STAGE_INSET} pr-12 [@media(max-height:820px)]:mb-5`}
            >
              <div>
                <SectionLabel tone="light">Where you can go</SectionLabel>
                <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink lg:text-5xl">
                  Top destinations,{" "}
                  <span className="bg-gradient-to-r from-crimson to-gold bg-clip-text text-transparent">
                    honestly matched
                  </span>
                </h2>
              </div>
              <p className="hidden max-w-[15rem] pb-1 text-right text-sm leading-relaxed text-slate xl:block">
                Keep scrolling — the world moves sideways.
                <span className="mt-2 block font-display text-xs font-bold uppercase tracking-[0.18em] text-mist-dim">
                  9 routes · one dedicated team
                </span>
              </p>
            </div>

            {/* Panel track */}
            <motion.div
              ref={trackRef}
              style={{ x }}
              className={`flex w-max items-stretch gap-7 will-change-transform ${STAGE_INSET}`}
            >
              {destinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className="w-[24rem] shrink-0 py-4 [@media(max-height:820px)]:py-2"
                >
                  <DestinationCard destination={destination} index={index} />
                </div>
              ))}
              {/* Exit spacer so the final card clears the right edge */}
              <div className="w-28 shrink-0" />
            </motion.div>

            {/* Journey rail */}
            <div
              className={`relative mt-10 ${STAGE_INSET} pr-12 [@media(max-height:820px)]:mt-6`}
            >
              <JourneyRail progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Mobile / tablet / reduced-motion: staggered grid fallback ── */
  return (
    <section id="destinations" className="bg-paper py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          label="Where you can go"
          title="Top destinations, honestly matched"
          description="From MOI-friendly Canada to Malaysia's calling-visa jobs — we point you to the routes that genuinely fit your profile and budget."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: (index % 2) * 0.09,
              }}
              className="h-full"
            >
              <DestinationCard destination={destination} index={index} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
