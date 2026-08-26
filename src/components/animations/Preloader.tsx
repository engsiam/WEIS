import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { hasSeenIntro, markIntroSeen } from "../../lib/intro";

/**
 * Refined brand intro (§14) — a light curtain with the WEIS wordmark and a
 * route line that draws once, then lifts away into the hero. Shows at most
 * once per session, lasts ~1s, is skipped entirely under reduced motion or
 * when sessionStorage is unavailable, and never blocks interaction for long.
 */
export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (reduceMotion || hasSeenIntro()) return;
    setShow(true);
    setMounted(true);
    markIntroSeen();
    const timer = window.setTimeout(() => setShow(false), 1050);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper"
      initial={{ y: 0 }}
      animate={show ? { y: 0 } : { y: "-100%" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      onAnimationComplete={() => {
        if (!show) setMounted(false);
      }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="flex flex-col items-center gap-4"
      >
        <span className="font-display text-3xl font-extrabold tracking-tight text-navy">
          WEIS
        </span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-slate">
          Study · Work · Migrate
        </span>
        <span className="mt-2 block h-px w-40 overflow-hidden bg-line">
          <motion.span
            className="block h-full w-full origin-left bg-gradient-to-r from-crimson via-gold to-royal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}
