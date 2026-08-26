import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant =
  | "crimson"
  | "gold"
  | "navy"
  | "outline"
  | "outline-light"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  crimson:
    "bg-crimson text-white shadow-card hover:bg-crimson-deep hover:shadow-lift hover:-translate-y-0.5",
  gold: "bg-gold text-navy hover:bg-gold-soft hover:-translate-y-0.5",
  navy: "bg-navy text-white hover:bg-navy-raised hover:-translate-y-0.5",
  outline:
    "border border-line bg-transparent text-ink hover:border-crimson hover:text-crimson",
  "outline-light":
    "border border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/12",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 gap-1.5 px-4 text-sm",
  md: "h-12 gap-2 px-6 text-[0.95rem]",
  lg: "h-14 gap-2.5 px-8 text-base",
};

const BASE =
  "inline-flex select-none items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-300 ease-out will-change-transform focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps =
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export function Button({
  variant = "crimson",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className
  );

  if (typeof (rest as { href?: string }).href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
