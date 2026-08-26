import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePointerFine } from "../../hooks/usePointerFine";
import { useReducedMotion } from "motion/react";

/**
 * Desktop cursor follower (§11) — a soft ring that trails the native cursor
 * (which stays visible for usability) and gently expands over interactive
 * elements. Hidden entirely on touch devices and under reduced motion.
 */
export function CursorGlow() {
  const pointerFine = usePointerFine();
  const reduceMotion = useReducedMotion();
  const enabled = pointerFine && !reduceMotion;

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 38, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 380, damping: 38, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest("a, button, input, select, textarea, [data-cursor]")
        )
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="-ml-4 -mt-4 h-8 w-8 rounded-full border-[1.5px] border-white mix-blend-difference"
        animate={{
          scale: active ? 1.9 : 1,
          opacity: visible ? (active ? 0.9 : 0.55) : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}
