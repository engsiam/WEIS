import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "../../hooks/usePointerFine";
import { cn } from "../../lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** 0–1 — fraction of the cursor offset the element follows. */
  strength?: number;
  /** Hard clamp in px so the pull never becomes silly. */
  max?: number;
}

/**
 * Magnetic micro-interaction (§10). The wrapped element drifts a few pixels
 * toward the cursor with soft spring physics and settles back on leave.
 * Desktop pointers only; disabled under reduced motion. Applied sparingly —
 * primary CTAs only.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  max = 10,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reduceMotion = useReducedMotion();
  const enabled = pointerFine && !reduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.3 });

  const handleMove = (event: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-max, Math.min(max, dx * strength)));
    y.set(Math.max(-max, Math.min(max, dy * strength)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
