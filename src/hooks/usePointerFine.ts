import { useEffect, useState } from "react";

/**
 * True when the device has a precise hover-capable pointer (mouse/trackpad).
 * Desktop-only effects (magnetic buttons, cursor follower) gate on this so
 * touch devices never pay for — or see — cursor theatrics.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");
    const update = () => setFine(pointerQuery.matches && hoverQuery.matches);
    update();
    pointerQuery.addEventListener("change", update);
    hoverQuery.addEventListener("change", update);
    return () => {
      pointerQuery.removeEventListener("change", update);
      hoverQuery.removeEventListener("change", update);
    };
  }, []);

  return fine;
}
