import { useCountUp } from "../../hooks/useCountUp";
import { cn } from "../../lib/utils";
import type { Stat } from "../../types";

interface StatCounterProps {
  stat: Stat;
  tone?: "light" | "dark";
  className?: string;
}

export function StatCounter({ stat, tone = "dark", className }: StatCounterProps) {
  const { ref, value } = useCountUp(stat.value);
  const isDark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        ref={ref}
        className={cn(
          "font-display text-4xl font-extrabold tabular-nums sm:text-5xl",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {stat.prefix}
        {value}
        {stat.suffix}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          isDark ? "text-mist" : "text-slate"
        )}
      >
        {stat.label}
      </span>
    </div>
  );
}
