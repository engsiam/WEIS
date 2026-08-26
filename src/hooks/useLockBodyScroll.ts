import { useEffect } from "react";
import { getLenis } from "../lib/lenis";

/**
 * Locks body scroll while `locked` is true (used by the lead modal and the
 * mobile menu). Restores the previous overflow value on cleanup. When the
 * Lenis smooth-scroll system is active it is paused too, so wheel input
 * cannot fight the locked overlay.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [locked]);
}
