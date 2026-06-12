"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import { cn } from "@/lib/utils";

function EqualizerBars() {
  const heights = [0.45, 0.75, 0.55, 0.9];

  return (
    <div className="flex h-4 items-end justify-center gap-[3px]" aria-hidden="true">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-foreground"
          animate={{ scaleY: [h, 1, h * 0.7, 1, h] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
          style={{ height: 14, transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="currentColor"
      aria-hidden="true"
      className="ml-0.5"
    >
      <path d="M0 0v14l12-7L0 0z" />
    </svg>
  );
}

interface AudioControlProps {
  className?: string;
}

export function AudioControl({ className }: AudioControlProps) {
  const { isPlaying, toggle } = useAudio();

  return (
    <div className={cn("relative", className)}>
      {isPlaying && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-foreground/20"
          animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          aria-hidden="true"
        />
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        aria-pressed={isPlaying}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background/40 text-foreground backdrop-blur-md transition-all duration-500 hover:border-foreground/45 hover:bg-foreground/10",
          isPlaying && "border-foreground/35 shadow-[0_0_20px_rgba(245,240,232,0.12)]"
        )}
      >
        {isPlaying ? <EqualizerBars /> : <PlayIcon />}
      </button>
    </div>
  );
}

export { AudioControl as MusicToggle };
