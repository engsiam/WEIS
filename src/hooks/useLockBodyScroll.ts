import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true (used by the lead modal and the
 * mobile menu). Restores the previous overflow value on cleanup.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
