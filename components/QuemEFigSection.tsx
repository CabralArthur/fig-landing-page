"use client";

import { motion, type MotionProps } from "framer-motion";
import { aboutFig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface QuemEFigSectionProps {
  compact?: boolean;
  /** When false, GSAP controls the reveal — skip Framer entry animations. */
  animateEntry?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;
const revealEase = [0.76, 0, 0.24, 1] as const;

function entryMotion(animateEntry: boolean, delay = 0): MotionProps {
  if (!animateEntry) {
    return { initial: false };
  }

  return {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, ease: revealEase, delay },
  };
}

function FigPortrait({
  compact,
  isMobile,
  animateEntry,
}: {
  compact: boolean;
  isMobile: boolean;
  animateEntry: boolean;
}) {
  const enableEffects = compact && !isMobile;

  const portraitMotion: MotionProps = animateEntry
    ? {
        initial: { opacity: 0, y: compact ? (isMobile ? 40 : 80) : 48 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: isMobile ? 0.9 : 1.35,
          ease,
          delay: compact ? (isMobile ? 0.45 : 0.58) : 0.18,
        },
      }
    : { initial: false };

  return (
    <div
      className={cn(
        "flex w-full items-end justify-center",
        compact &&
          "relative w-full max-md:shrink-0 max-md:justify-center max-md:pb-0 md:absolute md:bottom-0 md:right-0 md:top-28 md:w-[54%] lg:w-[50%]",
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
        {...portraitMotion}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aboutFig.image}
          alt="FIG — Retrato"
          draggable={false}
          className={cn(
            "block w-auto max-w-full select-none object-contain object-bottom",
            compact &&
              "max-md:max-h-[min(52dvh,440px)] max-md:w-auto md:max-h-[calc(100dvh-7.5rem)]",
            !compact && "max-h-[min(72vh,640px)]"
          )}
        />
      </motion.div>

      {enableEffects && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-32 bg-gradient-to-r from-foreground to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function AboutCopy({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <p
        className={cn(
          "font-sans uppercase tracking-[0.28em] text-background/45",
          compact
            ? "mb-2 text-[10px] max-md:mx-auto md:mb-4"
            : "mb-3 text-[10px] md:mb-4 md:text-xs"
        )}
      >
        Sobre
      </p>
      <h2
        className={cn(
          "font-display uppercase leading-[0.86] tracking-display-tight text-background",
          compact
            ? "max-md:mx-auto max-md:text-[clamp(2.75rem,13vw,3.5rem)] md:text-[clamp(3.25rem,6vw,7rem)]"
            : "text-[clamp(2.5rem,9vw,5.5rem)]"
        )}
      >
        <span className="block">Quem é</span>
        <span className="block">FIG</span>
      </h2>
      <p
        className={cn(
          "font-sans text-background/75",
          compact
            ? "mt-2 max-w-[34ch] text-[0.9375rem] leading-[1.6] max-md:mx-auto max-md:text-center md:mt-6 md:max-w-none md:text-base md:leading-relaxed lg:mt-8 lg:text-[1.35rem]"
            : "mt-5 text-sm leading-relaxed max-md:max-w-[34ch] max-md:text-[0.9375rem] max-md:leading-[1.72] md:mt-7 md:max-w-none md:text-lg md:leading-relaxed"
        )}
      >
        {aboutFig.description}
      </p>
    </>
  );
}

export function QuemEFigSection({
  compact = false,
  animateEntry = true,
}: QuemEFigSectionProps) {
  const isMobile = useIsMobile();

  if (compact) {
    return (
      <section
        id="sobre"
        className="relative flex h-full min-h-0 flex-col justify-end overflow-hidden bg-foreground text-background max-md:pb-0 md:overflow-x-hidden md:px-10 md:pt-28"
      >
        <motion.div
          className={cn(
            "relative z-20 shrink-0 max-md:mb-1 max-md:px-6",
            "max-md:flex max-md:w-full max-md:flex-col max-md:items-center max-md:text-center",
            "md:flex md:h-full md:w-[52%] md:items-center md:justify-center md:px-8 lg:w-[50%] lg:px-14"
          )}
          {...entryMotion(animateEntry, animateEntry ? 0.12 : 0)}
        >
          <div className="md:max-w-lg md:text-center lg:max-w-xl">
            <AboutCopy compact />
          </div>
        </motion.div>

        <FigPortrait compact isMobile={isMobile} animateEntry={animateEntry} />
      </section>
    );
  }

  return (
    <section
      id="sobre"
      className="bg-foreground px-6 pb-16 pt-10 text-background md:px-10 md:pb-20 md:pt-12"
    >
      <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 md:grid-cols-2 md:items-center md:gap-10">
        <motion.div
          {...entryMotion(animateEntry)}
          className="max-md:text-center md:max-w-lg"
        >
          <AboutCopy />
        </motion.div>

        <div className="relative w-full justify-self-end">
          <FigPortrait compact={false} isMobile={isMobile} animateEntry={animateEntry} />
        </div>
      </div>
    </section>
  );
}
