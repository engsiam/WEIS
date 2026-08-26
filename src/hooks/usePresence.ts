import { useEffect, useState } from "react";

/**
 * Mount-through-exit without `<AnimatePresence>`.
 *
 * In this `motion@13` + Vite/Rolldown build, `AnimatePresence` does not run
 * its exit lifecycle to completion — the internal "safe to remove" callback
 * never fires, so an exiting node stays mounted forever (a modal that will
 * not close, a drawer that will not slide away). This hook sidesteps that:
 * it keeps a node mounted while `open` is true and for the duration of its
 * close animation.
 *
 * Usage: drive the element's `animate` prop with `show`, and call `onExited`
 * from its `onAnimationComplete` once the closing animation settles:
 *
 *   const { mounted, show, onExited } = usePresence(open);
 *   if (!mounted) return null;
 *   <motion.div
 *     animate={show ? shownState : hiddenState}
 *     onAnimationComplete={() => { if (!show) onExited(); }}
 *   />
 */
export function usePresence(open: boolean): {
  mounted: boolean;
  show: boolean;
  onExited: () => void;
} {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  return { mounted, show: open, onExited: () => setMounted(false) };
}
