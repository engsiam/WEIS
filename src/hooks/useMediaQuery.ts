import { useEffect, useState } from "react";

/**
 * Reactive CSS media query. Initialised synchronously on first render (SPA —
 * no SSR), so elements conditionally mounted on desktop exist in the SAME
 * commit that scroll-linked hooks (useScroll targets etc.) measure them.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const queryList = window.matchMedia(query);
    const update = () => setMatches(queryList.matches);
    update();
    queryList.addEventListener("change", update);
    return () => queryList.removeEventListener("change", update);
  }, [query]);

  return matches;
}
