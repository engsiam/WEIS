import type Lenis from "lenis";

/**
 * Module-level Lenis singleton. The SmoothScroll provider owns the instance;
 * other modules (anchor scrolling, scroll locking) read it from here so the
 * whole app shares one smooth-scroll context.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
