import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts a number up from 0 to `target` the first time it scrolls into view.
 * Honors reduced-motion by jumping straight to the final value.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  duration = 1600
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTs = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, duration]);

  return { ref, value };
}
