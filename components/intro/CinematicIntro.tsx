"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import { HERO_NAVY, HERO_NAVY_RGB } from "@/lib/theme";

const LogoScene = dynamic(
  () => import("./LogoScene").then((mod) => mod.LogoScene),
  { ssr: false }
);

interface CinematicIntroProps {
  onComplete: () => void;
}

const AUTO_EXIT_MS = 2200;
const MIN_HOLD_MS = 700;
const EXIT_DURATION_MS = 800;

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const { play } = useAudio();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasExited = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    setExiting(true);

    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, EXIT_DURATION_MS);
  }, [onComplete]);

  useEffect(() => {
    if (!modelReady) return;
    void play();
  }, [modelReady, play]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const holdTimer = setTimeout(() => setCanSkip(true), MIN_HOLD_MS);
    const autoTimer = setTimeout(startExit, AUTO_EXIT_MS);
    const readyTimer = setTimeout(() => setModelReady(true), 250);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        void play();
        startExit();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      document.body.style.overflow = "";
      clearTimeout(holdTimer);
      clearTimeout(autoTimer);
      clearTimeout(readyTimer);
      window.removeEventListener("wheel", onWheel);
    };
  }, [startExit, play]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] cursor-pointer overflow-hidden"
          style={{ backgroundColor: HERO_NAVY.deep }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            void play();
            if (!canSkip) return;
            startExit();
          }}
          role="presentation"
          aria-label="Introdução cinematográfica FIG"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${HERO_NAVY.mid}44 0%, ${HERO_NAVY.base}66 40%, ${HERO_NAVY.deep} 100%)`,
            }}
          />

          <motion.div
            className="pointer-events-none absolute -left-[20%] top-1/2 z-[2] h-[75vh] w-[55vw] -translate-y-1/2 rounded-full blur-[100px] md:-left-[15%] md:blur-[140px]"
            style={{
              background: `radial-gradient(circle, rgba(${HERO_NAVY_RGB.light}, 0.5) 0%, rgba(${HERO_NAVY_RGB.mid}, 0.22) 42%, transparent 72%)`,
            }}
            animate={{ opacity: [0.55, 0.75, 0.55], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute -right-[20%] top-1/2 z-[2] h-[75vh] w-[55vw] -translate-y-1/2 rounded-full blur-[100px] md:-right-[15%] md:blur-[140px]"
            style={{
              background: `radial-gradient(circle, rgba(${HERO_NAVY_RGB.light}, 0.5) 0%, rgba(${HERO_NAVY_RGB.mid}, 0.22) 42%, transparent 72%)`,
            }}
            animate={{ opacity: [0.55, 0.75, 0.55], scale: [1, 1.06, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute -left-[18%] -top-[22%] z-[2] h-[50vh] w-[50vw] rounded-full blur-[90px] md:-left-[12%] md:-top-[18%] md:blur-[120px]"
            style={{
              background: `radial-gradient(circle, rgba(${HERO_NAVY_RGB.light}, 0.42) 0%, rgba(${HERO_NAVY_RGB.mid}, 0.18) 45%, transparent 72%)`,
            }}
            animate={{ opacity: [0.45, 0.65, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute -right-[18%] -top-[22%] z-[2] h-[50vh] w-[50vw] rounded-full blur-[90px] md:-right-[12%] md:-top-[18%] md:blur-[120px]"
            style={{
              background: `radial-gradient(circle, rgba(${HERO_NAVY_RGB.light}, 0.42) 0%, rgba(${HERO_NAVY_RGB.mid}, 0.18) 45%, transparent 72%)`,
            }}
            animate={{ opacity: [0.45, 0.65, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            aria-hidden="true"
          />

          <motion.div
            className="absolute inset-0 z-[1] overflow-hidden"
            style={{ backgroundColor: "transparent" }}
            animate={{
              scale: exiting ? (isMobile ? 1.12 : 1.3) : 1,
              opacity: exiting ? 0 : 1,
            }}
            transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          >
            <LogoScene exiting={exiting} />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[10%] z-[3] flex flex-col items-center px-6 text-center md:bottom-[14%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: exiting ? 0 : modelReady ? 1 : 0,
              y: exiting ? -12 : 0,
            }}
            transition={{ duration: 0.5, delay: modelReady ? 0.1 : 0 }}
          >
            <p className="text-display-label text-xs md:text-base">DJ Open Format</p>
          </motion.div>

          <motion.p
            className="pointer-events-none absolute bottom-6 left-0 right-0 z-[3] px-4 text-center font-sans text-[10px] uppercase tracking-[0.25em] text-muted/60 md:bottom-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: canSkip && !exiting ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            clique ou role para entrar
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
