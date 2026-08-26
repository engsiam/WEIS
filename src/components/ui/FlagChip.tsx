import { cn } from "../../lib/utils";

interface FlagChipProps {
  flag: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}

export function FlagChip({ flag, label, tone = "dark", className }: FlagChipProps) {
  const isDark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold",
        isDark
          ? "border-white/12 bg-white/5 text-mist"
          : "border-line bg-white text-ink shadow-sm",
        className
      )}
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {flag}
      </span>
      {label}
    </span>
  );
}
