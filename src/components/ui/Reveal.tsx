import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerParent, VIEWPORT } from "../../lib/motion";

function withDelay(variants: Variants, delay?: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (typeof visible !== "object" || visible === null) return variants;
  const v = visible as Record<string, unknown>;
  const transition = (v.transition as Record<string, unknown> | undefined) ?? {};
  return { ...variants, visible: { ...v, transition: { ...transition, delay } } };
}

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  variants = fadeUp,
  delay,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}

export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  once = true,
}: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

export function RevealItem({
  children,
  variants = fadeUp,
  className,
}: RevealItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
