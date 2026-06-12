import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FigWordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero" | "reveal";
  /** Hide from screen readers when decorative (e.g. parent has aria-label). */
  decorative?: boolean;
}

const sizeClasses = {
  sm: "text-[2rem] leading-[0.88]",
  md: "text-[2.75rem] leading-[0.88]",
  lg: "text-[4.5rem] leading-[0.86]",
  hero: "text-[clamp(3.5rem,20vw,10rem)] leading-[0.86]",
  reveal: "leading-[0.86]",
};

const letters = [
  { char: "F", className: "-mr-[0.09em]" },
  { char: "i", className: "-mr-[0.11em] -translate-x-[0.02em]" },
  { char: "g", className: "-mr-[0.04em]" },
  { char: ".", className: "-translate-x-[0.03em] translate-y-[0.04em]" },
] as const;

export const FigWordmark = forwardRef<HTMLSpanElement, FigWordmarkProps>(
  function FigWordmark({ className, size = "md", decorative = false }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          "font-fig inline-flex items-baseline whitespace-nowrap text-foreground",
          size === "reveal" && "reveal-wordmark",
          sizeClasses[size],
          className
        )}
        aria-hidden={decorative || undefined}
      >
        {letters.map(({ char, className: letterClass }) => (
          <span key={char} className={cn("relative", letterClass)}>
            {char}
          </span>
        ))}
      </span>
    );
  }
);
