import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { usePresence } from "../../hooks/usePresence";
import type { Faq } from "../../types";

interface AccordionProps {
  items: Faq[];
  className?: string;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { mounted, show, onExited } = usePresence(isOpen);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors",
        isOpen
          ? "border-crimson/30 bg-white shadow-card"
          : "border-line bg-white/70 hover:border-mist"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-bold text-ink sm:text-lg">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-crimson transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {mounted && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={
            show ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
          onAnimationComplete={() => {
            if (!show) onExited();
          }}
        >
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate sm:px-6">
            {item.answer}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
