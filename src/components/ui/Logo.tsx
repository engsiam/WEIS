import { useId } from "react";
import { cn } from "../../lib/utils";

function LogoMark() {
  const gradientId = useId();
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="4"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#12294d" />
          <stop offset="1" stopColor="#0b1d3a" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="39" height="39" rx="12" fill={`url(#${gradientId})`} />
      <rect
        x="2.5"
        y="2.5"
        width="39"
        height="39"
        rx="12"
        stroke="#1d4ed8"
        strokeOpacity="0.35"
      />
      {/* globe */}
      <circle
        cx="22"
        cy="24.5"
        r="10"
        stroke="#b9c4da"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <ellipse
        cx="22"
        cy="24.5"
        rx="4.2"
        ry="10"
        stroke="#b9c4da"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <path
        d="M12.4 21h19.2M13 28.5h18"
        stroke="#b9c4da"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      {/* graduation cap */}
      <path d="M22 8.5l11 4.4-11 4.4-11-4.4 11-4.4z" fill="#f2b705" />
      <path
        d="M22 17.6l6.5-2.6v3.7c0 1.6-2.9 2.9-6.5 2.9s-6.5-1.3-6.5-2.9V15l6.5 2.6z"
        fill="#d81f2a"
      />
      <path d="M33 12.9v4.4" stroke="#f2b705" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="33" cy="18" r="1.6" fill="#f2b705" />
    </svg>
  );
}

interface LogoProps {
  tone?: "light" | "dark";
  showText?: boolean;
  className?: string;
}

export function Logo({ tone = "dark", showText = true, className }: LogoProps) {
  const wordColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-mist" : "text-slate";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight",
              wordColor
            )}
          >
            WEIS
          </span>
          <span
            className={cn(
              "mt-0.5 hidden text-[0.58rem] font-semibold uppercase tracking-[0.2em] sm:block",
              subColor
            )}
          >
            Study · Work · Migrate
          </span>
        </span>
      )}
    </span>
  );
}
