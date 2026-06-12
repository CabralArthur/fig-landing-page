"use client";

import { FigWordmark } from "@/components/FigWordmark";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FigLogoRevealProps {
  className?: string;
}

export const FigLogoReveal = forwardRef<HTMLSpanElement, FigLogoRevealProps>(
  function FigLogoReveal({ className }, ref) {
    return (
      <FigWordmark
        ref={ref}
        size="reveal"
        decorative
        className={cn("block whitespace-nowrap", className)}
      />
    );
  }
);
