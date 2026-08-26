import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

interface SectionHeadingProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {label && (
        <Reveal>
          <SectionLabel tone={isDark ? "dark" : "light"}>{label}</SectionLabel>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]",
            isDark ? "text-white" : "text-ink",
            align === "center" && "mx-auto max-w-3xl"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              isDark ? "text-mist" : "text-slate",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
