import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

const LEAD_SEEN_KEY = "weis:lead-popup-seen";

/**
 * Auto-opens the eligibility wizard once per browser session, `delay` ms after
 * load. The session flag is set as soon as it fires so it never nags twice, and
 * it silently no-ops if sessionStorage is unavailable (e.g. private mode).
 */
export function useLeadPopup(delay = 3200): void {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_SEEN_KEY)) return;
    } catch {
      /* sessionStorage blocked — fall through and still show once */
    }

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(LEAD_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      openLeadModal();
    }, delay);

    return () => window.clearTimeout(timer);
  }, [openLeadModal, delay]);
}
