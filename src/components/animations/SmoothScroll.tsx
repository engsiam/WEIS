import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { setLenis } from "../../lib/lenis";

/**
 * Buttery inertial smooth scrolling (§1 of the motion spec).
 *
 * - Wheel/trackpad input is smoothed with a premium ease-out curve.
 * - Touch devices keep fully native scrolling (zero jank, zero lag).
 * - `prefers-reduced-motion` disables the system entirely.
 * - The rAF loop is cancelled and the instance destroyed on unmount — no leaks.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
