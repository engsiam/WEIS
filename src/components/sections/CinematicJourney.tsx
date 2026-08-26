import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { MessageCircle, Sparkles } from "lucide-react";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { contact } from "../../data/company";
import { Button } from "../ui/Button";
import { Magnetic } from "../animations/Magnetic";

/* ── Helpers ───────────────────────────────────────────────────────── */

/** Scene visibility window: fade-in → hold → fade-out with cinematic drift. */
function useSceneWindow(
  progress: MotionValue<number>,
  range: [number, number, number, number]
) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [70, 0, 0, -70]);
  const scale = useTransform(progress, [range[0], range[1]], [1.07, 1]);
  return { opacity, y, scale };
}

function Scene({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
}) {
  const { opacity, y, scale } = useSceneWindow(progress, range);
  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function GhostWord({
  progress,
  word,
  range,
}: {
  progress: MotionValue<number>;
  word: string;
  range: [number, number, number, number];
}) {
  const opacity = useTransform(progress, range, [0, 0.55, 0.55, 0]);
  const x = useTransform(progress, [range[0], range[3]], ["6%", "-6%"]);
  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, x }}
      className="stroke-text pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[17vw] font-extrabold uppercase leading-none tracking-tight"
    >
      {word}
    </motion.span>
  );
}

/* ── Scene 2 — flags fly in with 3D rotation ──────────────────────── */

const FLAGS = [
  { flag: "🇨🇦", label: "Canada" },
  { flag: "🇦🇺", label: "Australia" },
  { flag: "🇬🇧", label: "United Kingdom" },
  { flag: "🇲🇾", label: "Malaysia" },
  { flag: "🇩🇪", label: "Germany" },
  { flag: "🇦🇪", label: "UAE · Dubai" },
];

function FlyingFlag({
  progress,
  flag,
  label,
  index,
  total,
  range,
}: {
  progress: MotionValue<number>;
  flag: string;
  label: string;
  index: number;
  total: number;
  range: [number, number];
}) {
  const side = index % 2 === 0 ? -1 : 1;
  const t = [
    range[0] + (index / total) * 0.08,
    range[0] + 0.06 + (index / total) * 0.08,
  ] as const;
  const opacity = useTransform(progress, [t[0], t[1]], [0, 1]);
  const x = useTransform(progress, [t[0], t[1]], [side * 220, 0]);
  const rotateY = useTransform(progress, [t[0], t[1]], [side * 65, 0]);

  return (
    <motion.span
      style={{ opacity, x, rotateY, transformPerspective: 800 }}
      className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-base font-semibold text-mist backdrop-blur"
    >
      <span className="text-xl leading-none">{flag}</span>
      {label}
    </motion.span>
  );
}

/* ── Scene 3 — eligibility meter scrubbed by scroll ────────────────── */

function ScoreMeter({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0.54, 0.72], ["6%", "88%"]);
  const score = useTransform(progress, (value: number): string =>
    String(Math.round(Math.min(1, Math.max(0, (value - 0.54) / 0.18)) * 87)).padStart(2, "0")
  );

  return (
    <div className="w-full max-w-md">
      <div className="flex items-end justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
          Match score
        </span>
        <span className="font-display text-4xl font-extrabold tabular-nums text-white">
          <motion.span>{score}</motion.span>
          <span className="text-lg text-mist-dim">/100</span>
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          style={{ width }}
          className="h-full rounded-full bg-gradient-to-r from-crimson via-crimson-soft to-gold"
        />
      </div>
    </div>
  );
}

/* ── Silhouette skyline + palms (Vice-City horizon) ────────────────── */

function HorizonSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[34vh] w-full"
      aria-hidden="true"
    >
      <g fill="#050c19">
        {/* skyline */}
        <rect x="180" y="180" width="46" height="140" />
        <rect x="238" y="150" width="34" height="170" />
        <rect x="300" y="200" width="58" height="120" />
        <rect x="520" y="168" width="40" height="152" />
        <rect x="572" y="196" width="64" height="124" />
        <rect x="820" y="176" width="48" height="144" />
        <rect x="1080" y="156" width="36" height="164" />
        <rect x="1128" y="192" width="56" height="128" />
        <rect x="1260" y="172" width="44" height="148" />
        {/* ground */}
        <rect x="0" y="304" width="1440" height="16" />
        {/* palm — left */}
        <path d="M96 306 C 94 250 90 214 84 186 L 92 184 C 98 214 102 252 104 306 Z" />
        <path d="M88 184 C 66 168 44 166 26 178 C 50 162 74 164 90 180 Z" />
        <path d="M88 182 C 70 158 50 150 30 154 C 54 142 78 152 92 174 Z" />
        <path d="M90 182 C 92 156 104 138 124 130 C 106 146 96 164 94 184 Z" />
        <path d="M91 183 C 108 164 130 158 150 164 C 126 158 104 168 94 186 Z" />
        <path d="M90 181 C 86 158 74 142 56 134 C 74 146 84 162 86 182 Z" />
        {/* palm — right */}
        <path d="M1352 306 C 1354 252 1358 218 1364 192 L 1372 194 C 1366 220 1362 254 1360 306 Z" />
        <path d="M1368 192 C 1390 176 1412 174 1430 186 C 1406 170 1382 172 1366 188 Z" />
        <path d="M1369 190 C 1387 166 1407 158 1427 162 C 1403 150 1379 160 1365 182 Z" />
        <path d="M1367 190 C 1365 164 1353 146 1333 138 C 1351 154 1361 172 1363 192 Z" />
        <path d="M1366 191 C 1349 172 1327 166 1307 172 C 1331 166 1353 176 1363 194 Z" />
      </g>
    </svg>
  );
}

/* ── Mobile / reduced-motion fallback ──────────────────────────────── */

const CHAPTERS = [
  {
    kicker: "Chapter 01 · The dream",
    title: "Your future should not have borders.",
    body: "One team for study, work, migration and tours — from first question to landing.",
  },
  {
    kicker: "Chapter 02 · The destination",
    title: "Pick the country that fits you.",
    body: "Canada, Australia, UK, Malaysia, Europe and beyond — matched to your profile and budget.",
  },
  {
    kicker: "Chapter 03 · The check",
    title: "Know your eligibility in 60 seconds.",
    body: "A free, honest assessment scored against WEIS's live campaigns.",
  },
  {
    kicker: "Chapter 04 · The beginning",
    title: "Then we start the paperwork.",
    body: "Documents, applications, visas — handled end-to-end by a dedicated advisor.",
  },
];

function FallbackChapters() {
  return (
    <section className="relative overflow-hidden bg-midnight py-24 text-white">
      <div className="world-dots absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-16 px-6">
        {CHAPTERS.map((chapter) => (
          <motion.div
            key={chapter.kicker}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-soft">
              {chapter.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {chapter.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
              {chapter.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */

export function CinematicJourney({ onStart }: { onStart: () => void }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const enabled = isDesktop && !reduceMotion;

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef });

  /* Shared scenery */
  const sunY = useTransform(scrollYProgress, [0, 0.85], [340, -60]);
  const sunScale = useTransform(scrollYProgress, [0, 0.85], [1.25, 0.92]);
  const starsIn = useTransform(scrollYProgress, [0, 0.18], [0, 0.8]);
  const scanDrift = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const chapterLabel = useTransform(scrollYProgress, (value: number): string => {
    if (value < 0.26) return "01 — THE DREAM";
    if (value < 0.51) return "02 — THE DESTINATION";
    if (value < 0.75) return "03 — THE CHECK";
    return "04 — THE BEGINNING";
  });

  if (!enabled) {
    return <FallbackChapters />;
  }

  return (
    <section aria-label="Your journey with WEIS">
      <div ref={wrapRef} style={{ height: "450vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-midnight text-white">
          {/* Night sky dots */}
          <motion.div
            style={{ opacity: starsIn }}
            className="world-dots absolute inset-0"
            aria-hidden="true"
          />

          {/* Sunset sun (Vice-City centerpiece) — kept low so it never
              sits behind chapter headlines */}
          <motion.div
            aria-hidden="true"
            style={{
              y: sunY,
              scale: sunScale,
              background:
                "radial-gradient(circle at 50% 32%, #ffe08a 0%, #fbcf3b 30%, #f2b705 52%, #e0442e 74%, rgba(216,31,42,0) 78%)",
            }}
            className="absolute left-1/2 top-[58%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[58%] h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
          />

          {/* Horizon scanlines */}
          <motion.div
            aria-hidden="true"
            style={{
              y: scanDrift,
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(216,31,42,0.22) 0px, rgba(216,31,42,0.22) 2px, transparent 2px, transparent 13px)",
              WebkitMaskImage:
                "linear-gradient(to top, black 55%, transparent 100%)",
              maskImage:
                "linear-gradient(to top, black 55%, transparent 100%)",
            }}
            className="absolute inset-x-0 bottom-0 h-[38vh]"
          />

          {/* Skyline + palms */}
          <HorizonSilhouette />

          {/* Center scrim — guarantees headline contrast over the sun */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 52% at 50% 50%, rgba(6,15,31,0.55) 0%, rgba(6,15,31,0.28) 45%, transparent 75%)",
            }}
          />

          {/* Cinematic vignette — focuses the eye, hides stage edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(6,15,31,0.55) 100%)",
            }}
          />

          {/* Permanent section label — always tells you what this is */}
          <div className="pointer-events-none absolute inset-x-0 top-7 flex justify-center">
            <span className="rounded-full border border-white/15 bg-midnight/60 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold-soft backdrop-blur">
              The WEIS Journey · Scroll story
            </span>
          </div>

          {/* Ghost words */}
          <GhostWord progress={scrollYProgress} word="Dream" range={[0, 0.02, 0.24, 0.29]} />
          <GhostWord progress={scrollYProgress} word="Abroad" range={[0.27, 0.29, 0.49, 0.54]} />
          <GhostWord progress={scrollYProgress} word="Visa" range={[0.52, 0.54, 0.73, 0.78]} />
          <GhostWord progress={scrollYProgress} word="Begin" range={[0.76, 0.78, 1, 1]} />

          {/* ── Chapter 01 — The dream ── */}
          <Scene progress={scrollYProgress} range={[0, 0.03, 0.24, 0.29]}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">
              Chapter 01 · The dream
            </p>
            <h2 className="mt-6 text-center font-display text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(6,15,31,0.85)]">
              Your future
              <br />
              should not
              <br />
              have borders.
            </h2>
          </Scene>

          {/* ── Chapter 02 — The destination ── */}
          <Scene progress={scrollYProgress} range={[0.26, 0.31, 0.49, 0.54]}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">
              Chapter 02 · The destination
            </p>
            <h2 className="mt-5 text-center font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-tight tracking-tight drop-shadow-[0_4px_28px_rgba(6,15,31,0.8)]">
              Choose where you belong
            </h2>
            <div className="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3 [transform-style:preserve-3d]">
              {FLAGS.map((item, index) => (
                <FlyingFlag
                  key={item.label}
                  progress={scrollYProgress}
                  flag={item.flag}
                  label={item.label}
                  index={index}
                  total={FLAGS.length}
                  range={[0.27, 0.5]}
                />
              ))}
            </div>
          </Scene>

          {/* ── Chapter 03 — The check ── */}
          <Scene progress={scrollYProgress} range={[0.51, 0.56, 0.73, 0.78]}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">
              Chapter 03 · The check
            </p>
            <h2 className="mt-5 text-center font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-tight tracking-tight drop-shadow-[0_4px_28px_rgba(6,15,31,0.8)]">
              Know exactly where you stand
            </h2>
            <div className="mt-10 rounded-3xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur">
              <ScoreMeter progress={scrollYProgress} />
              <p className="mt-4 text-sm text-mist">
                60 seconds · completely free · honest result against live WEIS campaigns
              </p>
            </div>
          </Scene>

          {/* ── Chapter 04 — The beginning (holds until the pin releases) ── */}
          <Scene progress={scrollYProgress} range={[0.76, 0.81, 1, 1]}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">
              Chapter 04 · The beginning
            </p>
            <h2 className="mt-5 max-w-4xl text-center font-display text-[clamp(2.6rem,6vw,5.4rem)] font-extrabold leading-[1.02] tracking-tight drop-shadow-[0_4px_30px_rgba(6,15,31,0.85)]">
              Your next country{" "}
              <span className="bg-gradient-to-r from-gold-soft to-crimson-soft bg-clip-text text-transparent">
                is waiting.
              </span>
            </h2>
            <div className="pointer-events-auto mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic>
                <Button variant="crimson" size="lg" onClick={onStart}>
                  <Sparkles className="h-5 w-5" /> Start my journey — free check
                </Button>
              </Magnetic>
              <Button
                variant="outline-light"
                size="lg"
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp us
              </Button>
            </div>
          </Scene>

          {/* Chapter indicator */}
          <div className="pointer-events-none absolute bottom-8 left-[max(2rem,calc((100vw-80rem)/2+2rem))] flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <motion.span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-mist">
              {chapterLabel}
            </motion.span>
          </div>
          <div className="pointer-events-none absolute bottom-8 right-[max(2rem,calc((100vw-80rem)/2+2rem))] flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-mist-dim">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block h-8 w-px bg-gradient-to-b from-gold to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

