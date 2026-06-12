"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { preloadAudio } from "@/lib/audio";
import { AudioControl } from "@/components/AudioControl";
import { AudioProvider } from "@/components/AudioProvider";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BookingSection } from "@/components/BookingSection";
import { LogoRevealVideosSection } from "@/components/LogoRevealVideosSection";
import { MusicFeatureSection } from "@/components/MusicFeatureSection";
import { SiteFooter } from "@/components/SiteFooter";
import { useLenisScroll } from "@/hooks/useLenisScroll";

export function SiteExperience() {
  const [introComplete, setIntroComplete] = useState(false);

  useLenisScroll();

  useEffect(() => {
    preloadAudio();
  }, []);

  return (
    <AudioProvider autoStart>
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      <motion.div
        className="fixed bottom-6 right-5 z-[10001] md:bottom-10 md:right-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <AudioControl />
      </motion.div>

      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CustomCursor />
          <GrainOverlay className="hidden md:block" />
          <Header />
          <main>
            <HeroSection ready={introComplete} />
            <MusicFeatureSection />
            <LogoRevealVideosSection />
            <BookingSection />
            <SiteFooter />
          </main>
        </motion.div>
    </AudioProvider>
  );
}
