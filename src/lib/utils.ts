import { getLenis } from "./lenis";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Scrolls to a section, preferring the Lenis smooth-scroll instance when
 * available and falling back to native smooth scrolling otherwise. The offset
 * keeps the fixed header from covering section headings.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -80, duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * WEIS office WhatsApp line (01832-166151 → international, no leading zero).
 * Bangladesh country code +880.
 */
export const WHATSAPP_NUMBER = "8801832166151";

/**
 * Canonical WhatsApp chat deep-link, used verbatim by every WhatsApp entry
 * point on the site (header, footer, drawer, FAB, CTAs).
 */
export const WHATSAPP_CHAT_URL =
  "https://wa.me/8801832166151?text=Hello%20WEIS%20%F0%9F%91%8B%20I'd%20like%20to%20know%20more%20about%20your%20study%20%2F%20work%20%2F%20migration%20services.";

/** Build a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsAppUrl(
  message: string,
  phone: string = WHATSAPP_NUMBER
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
