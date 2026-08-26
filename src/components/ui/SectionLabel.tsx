import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  /** `light` = on a light background, `dark` = on a dark background. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionLabel({
  children,
  tone = "light",
  className,
}: SectionLabelProps) {
  const isDark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
        isDark
          ? "border-white/15 bg-white/5 text-gold-soft"
          : "border-line bg-white text-crimson",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isDark ? "bg-gold" : "bg-crimson"
        )}
      />
      {children}
    </span>
  );
}
