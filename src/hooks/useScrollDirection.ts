import { useEffect, useState } from "react";

/**
 * True while the user is scrolling down past `threshold`, false once they
 * scroll back up (or return near the top). Drives the compact/expanded
 * header states (§12 of the motion spec).
 */
export function useScrollDirection(threshold = 140): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 4 && y > threshold) {
        setCompact(true);
      } else if (y < lastY - 4 || y < threshold) {
        setCompact(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return compact;
}
