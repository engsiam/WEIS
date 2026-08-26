import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { cn } from "../../lib/utils";

interface TextRevealProps {
  text: string;
  /** Class for the outer wrapper (font size, colour, alignment…). */
  className?: string;
  /** Animate on mount instead of when scrolled into view. */
  mode?: "mount" | "inview";
  delay?: number;
  stagger?: number;
}

/**
 * Masked word-by-word text reveal (§9 — premium typography animation).
 * Each word rises out of its own overflow mask with a stagger, so headings
 * enter like editorial title cards. Transform-only: under reduced motion the
 * words simply appear (handled globally by MotionConfig).
 */
export function TextReveal({
  text,
  className,
  mode = "inview",
  delay = 0,
  stagger = 0.055,
}: TextRevealProps) {
  const words = text.split(" ");
  const state = mode === "mount" ? "visible" : undefined;

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      {...(mode === "mount"
        ? { animate: state }
        : { whileInView: "visible", viewport: { once: true, margin: "-64px" } })}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
          aria-hidden="true"
        >
          <motion.span
            custom={index + delay / Math.max(stagger, 0.001)}
            variants={{
              hidden: { y: "115%" },
              visible: (i: number) => ({
                y: "0%",
                transition: {
                  duration: 0.85,
                  ease: EASE_OUT_EXPO,
                  delay: delay + i * stagger,
                },
              }),
            }}
            className="inline-block will-change-transform"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
