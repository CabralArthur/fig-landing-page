"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "data-cursor"?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "a",
  href,
  onClick,
  target,
  rel,
  "data-cursor": dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const inner = (
    <motion.div
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} data-cursor={dataCursor}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} target={target} rel={rel} data-cursor={dataCursor}>
      {inner}
    </a>
  );
}
