import { cn } from "../../lib/utils";

interface PassportStampProps {
  label: string;
  sub?: string;
  rotate?: number;
  className?: string;
}

/** Decorative "approved" passport stamp used as a visual accent. */
export function PassportStamp({
  label,
  sub = "APPROVED",
  rotate = -12,
  className,
}: PassportStampProps) {
  return (
    <div
      className={cn("pointer-events-none select-none", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-gold/70 bg-gold/5 px-4 py-2 text-center backdrop-blur-sm">
        <span className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-gold-soft">
          {label}
        </span>
        <span className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-gold/80">
          {sub}
        </span>
      </div>
    </div>
  );
}
