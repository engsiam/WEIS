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
    <article
      className={
        "group relative flex h-full min-h-[23rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-panel " +
        (destination.featured
          ? "border-crimson/30 shadow-lift hover:border-crimson/60"
          : "border-line shadow-card hover:border-crimson/40")
      }
    >
      {/* Country backdrop image */}
      <img
        src={destination.image}
        alt={destination.country}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      {/* Cinematic overlay for legibility */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/45 to-midnight/[0.06]"
      />
      {/* Warm accent tint on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-crimson/20 via-transparent to-gold/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-full top-0 h-full w-1/2 -rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-[left] duration-[900ms] ease-out group-hover:left-[160%]"
      />
      {/* Ghost index numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 right-4 select-none font-display text-8xl font-extrabold leading-none text-white/[0.12] transition-colors duration-500 group-hover:text-white/25"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Flag + featured badge */}
      <div className="absolute inset-x-6 top-6 flex items-start justify-between">
        <span
          className="inline-block text-5xl font-bold text-white drop-shadow-lg transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
          aria-hidden="true"
        >
          {destination.flag}
        </span>
        {destination.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur-md">
            <Star className="h-3 w-3" /> Featured
          </span>
        )}
      </div>

      {/* Content pinned to the bottom */}
      <div className="relative p-7 pt-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold-soft">
          {destination.headline}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-white">
          {destination.country}
        </h3>
        <p className="mt-2 text-sm font-bold leading-relaxed text-white">
          {destination.note}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover:border-crimson/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover affordance — arrow glides forward */}
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-white">
          Explore routes
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-crimson">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
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
                  7 routes · one dedicated team
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
          description="From Portugal's work permits to the USA EB-3 and Malaysia's calling-visa jobs — we point you to the routes that genuinely fit your profile and budget."
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
