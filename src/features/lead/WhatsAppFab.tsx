import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useScrolled } from "../../hooks/useScrolled";
import { contact } from "../../data/company";

export function WhatsAppFab() {
  const visible = useScrolled(320);

  return (
    <motion.a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WEIS on WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lift sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.6, y: 20 }
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[160px] sm:inline">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
