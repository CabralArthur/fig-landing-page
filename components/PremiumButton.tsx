"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  label: string;
  href: string;
  external?: boolean;
  index?: number;
  ready?: boolean;
  variant?: "primary" | "outline";
}

export function PremiumButton({
  label,
  href,
  external,
  index = 0,
  ready = true,
  variant = "outline",
}: PremiumButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        delay: 0.9 + index * 0.08,
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <MagneticButton
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        strength={0.25}
        data-cursor="ver"
      >
        <span
          className={cn(
            "group relative inline-flex h-11 items-center overflow-hidden rounded-full px-5 font-display text-xs uppercase tracking-display-wide transition-colors duration-500 md:h-12 md:px-7 md:text-sm",
            variant === "primary"
              ? "bg-foreground text-background"
              : "border border-foreground/20 text-foreground hover:border-foreground/50"
          )}
        >
          <span
            className={cn(
              "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100",
              variant === "outline" && "bg-foreground/10",
              variant === "primary" && "bg-background/20"
            )}
          />
          <span className="relative z-10">{label}</span>
        </span>
      </MagneticButton>
    </motion.div>
  );
}
