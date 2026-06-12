"use client";

import { motion } from "framer-motion";
import { aboutFig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface QuemEFigSectionProps {
  compact?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;
const revealEase = [0.76, 0, 0.24, 1] as const;

function FigPortrait({
  compact,
  isMobile,
}: {
  compact: boolean;
  isMobile: boolean;
}) {
  const enableEffects = compact && !isMobile;

  return (
    <div
      className={cn(
        "flex w-full items-end justify-center",
        compact && isMobile && "relative min-h-0 flex-1",
        compact && !isMobile && "absolute bottom-0 right-0 top-28 w-[54%] lg:w-[50%]",
        !compact && "relative aspect-square max-w-lg"
      )}
    >
      {enableEffects && (
        <div
          className="pointer-events-none absolute bottom-[18%] left-1/2 z-0 h-[50%] w-[62%] -translate-x-1/2 rounded-full"
          aria-hidden="true"
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,214,0,0.2)_0%,rgba(255,214,0,0.05)_45%,transparent_72%)] blur-2xl" />
        </div>
      )}

      <motion.div
        className="relative z-[2] flex w-full items-end justify-center md:justify-end md:pr-2"
        initial={{ opacity: 0, y: compact ? (isMobile ? 40 : 80) : 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: isMobile ? 0.9 : 1.35,
          ease,
          delay: compact ? (isMobile ? 0.45 : 0.58) : 0.18,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aboutFig.image}
          alt="FIG — Retrato"
          draggable={false}
          className={cn(
            "block w-auto max-w-full select-none object-contain object-bottom",
            compact && isMobile && "max-h-[min(46dvh,400px)]",
            compact && !isMobile && "max-h-[calc(100dvh-7.5rem)]",
            !compact && "max-h-[min(72vh,640px)]"
          )}
        />
      </motion.div>

      {compact && !isMobile && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-32 bg-gradient-to-r from-foreground to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function QuemEFigSection({ compact = false }: QuemEFigSectionProps) {
  const isMobile = useIsMobile();

  if (compact && isMobile) {
    return (
      <section
        id="sobre"
        className="relative flex h-full min-h-0 flex-col bg-foreground px-5 pb-0 pt-20 text-background"
      >
        <motion.div
          className="relative z-20 shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: revealEase, delay: 0.35 }}
        >
          <h2 className="font-display text-[clamp(2.25rem,11vw,3.5rem)] uppercase leading-[0.88] tracking-display-tight text-background">
            {aboutFig.title}
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-background/70">
            {aboutFig.description}
          </p>
        </motion.div>

        <FigPortrait compact isMobile={isMobile} />
      </section>
    );
  }

  return (
    <section
      id="sobre"
      className={cn(
        "bg-foreground text-background",
        compact
          ? "relative h-full min-h-0 overflow-x-hidden px-10 pb-0 pt-28"
          : "px-5 pb-16 pt-8 md:px-10 md:pb-20 md:pt-12"
      )}
    >
      <div
        className={cn(
          "relative z-20 w-full",
          compact
            ? "flex h-full w-[52%] items-center justify-center px-8 lg:w-[50%] lg:px-14"
            : "mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 md:grid-cols-2 md:items-center md:gap-10"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: revealEase, delay: compact ? 0.38 : 0 }}
          className={cn(
            compact
              ? "max-w-lg text-center lg:max-w-xl"
              : "max-w-xl md:max-w-lg"
          )}
        >
          <h2
            className={cn(
              "font-display uppercase leading-[0.88] tracking-display-tight text-background",
              compact
                ? "text-[clamp(3.25rem,6vw,7rem)]"
                : "text-[clamp(2.5rem,9vw,5.5rem)]"
            )}
          >
            {aboutFig.title}
          </h2>
          <p
            className={cn(
              "mt-5 font-sans leading-relaxed text-background/70",
              compact
                ? "mt-6 text-base leading-relaxed md:text-xl md:leading-relaxed lg:mt-8 lg:text-[1.35rem]"
                : "text-sm md:mt-7 md:text-lg md:leading-relaxed"
            )}
          >
            {aboutFig.description}
          </p>
        </motion.div>

        {!compact && (
          <div className="relative w-full justify-self-end">
            <FigPortrait compact={false} isMobile={isMobile} />
          </div>
        )}
      </div>

      {compact && !isMobile && <FigPortrait compact isMobile={isMobile} />}
    </section>
  );
}
