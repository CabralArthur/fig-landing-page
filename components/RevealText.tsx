"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

function buildVariants(useBlur: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 28,
      ...(useBlur ? { filter: "blur(8px)" } : {}),
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      ...(useBlur ? { filter: "blur(0px)" } : {}),
      transition: { delay: i * 0.1, duration: 0.85, ease },
    }),
  };
}

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  ready?: boolean;
  once?: boolean;
  blur?: boolean;
}

export function RevealText({
  children,
  className,
  index = 0,
  ready = true,
  once = false,
  blur = true,
}: RevealTextProps) {
  const variants = buildVariants(blur);

  if (once) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        custom={index}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      custom={index}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
