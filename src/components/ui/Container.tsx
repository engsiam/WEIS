import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

const SIZES = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
} as const;

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", SIZES[size], className)}>
      {children}
    </div>
  );
}
