export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * WEIS office WhatsApp line (01832-166151 → international, no leading zero).
 * Bangladesh country code +880.
 */
export const WHATSAPP_NUMBER = "8801832166151";

/** Build a wa.me deep link with a pre-filled, URL-encoded message. */
export function buildWhatsAppUrl(
  message: string,
  phone: string = WHATSAPP_NUMBER
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
