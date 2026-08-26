import type { Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT = { once: true, margin: "-72px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const staggerParent = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(8% 6% 8% 6% round 14px)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 14px)",
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};
