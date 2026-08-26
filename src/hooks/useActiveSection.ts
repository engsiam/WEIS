import { useEffect, useRef } from "react";
import { useAppStore } from "../store/useAppStore";
import type { NavLink } from "../types";

export function useActiveSection(links: NavLink[]): void {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const idsRef = useRef(links.map((link) => link.id));

  useEffect(() => {
    const sections = idsRef.current
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);
}
