import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: "normal" | "slow";
  reverse?: boolean;
  className?: string;
}

/**
 * Seamless infinite marquee. Renders the track twice and translates it -50%,
 * so the duplicate slides in exactly as the first exits. The second copy is
 * hidden from assistive tech. Pauses on hover; disabled under reduced-motion.
 */
export function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center pause-on-hover",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
