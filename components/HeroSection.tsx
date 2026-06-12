"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FigLogo } from "@/components/FigLogo";
import { PremiumButton } from "@/components/PremiumButton";
import { RevealText } from "@/components/RevealText";
import { useIsMobile } from "@/hooks/useIsMobile";
import { actionLinks } from "@/lib/data";
import { HERO_NAVY } from "@/lib/theme";

interface HeroSectionProps {
  ready?: boolean;
}

function HeroNavyBackdrop() {
  return (
    <>
      <div className="absolute inset-0" style={{ backgroundColor: HERO_NAVY.base }} />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 75% at 50% 32%, ${HERO_NAVY.light} 0%, ${HERO_NAVY.mid} 42%, ${HERO_NAVY.base} 72%, ${HERO_NAVY.deep} 100%)`,
        }}
      />
    </>
  );
}

function HeroBackgroundImage({ ready }: { ready: boolean }) {
  return (
    <Image
      src="/images/banner.png"
      alt="FIG — Retrato do DJ"
      fill
      priority
      unoptimized
      className="object-cover object-[center_15%] md:object-center"
      sizes="100vw"
    />
  );
}

export function HeroSection({ ready = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  const overlays = (
    <>
      <div
        className="absolute inset-0 mix-blend-multiply opacity-35 md:opacity-25"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${HERO_NAVY.light} 0%, transparent 70%)`,
        }}
      />
      {/* Mobile: gradiente embaixo na tonalidade navy */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(to top, ${HERO_NAVY.deep} 0%, ${HERO_NAVY.deep}ee 28%, ${HERO_NAVY.base}66 55%, transparent 100%)`,
        }}
      />
      {/* Desktop: gradientes laterais + base */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: `linear-gradient(to top, ${HERO_NAVY.deep} 0%, ${HERO_NAVY.base}99 38%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: `linear-gradient(to right, ${HERO_NAVY.deep}cc 0%, transparent 32%, transparent 68%, ${HERO_NAVY.deep}cc 100%)`,
        }}
      />
      <div
        className="absolute -left-1/4 top-1/4 hidden h-96 w-96 rounded-full blur-[120px] md:block"
        style={{ backgroundColor: "rgba(10, 47, 110, 0.22)" }}
      />
      <div
        className="absolute -right-1/4 bottom-1/4 hidden h-80 w-80 rounded-full blur-[100px] md:block"
        style={{ backgroundColor: "rgba(0, 33, 87, 0.28)" }}
      />
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden md:min-h-[110vh]"
      id="hero"
      style={{ backgroundColor: HERO_NAVY.base }}
    >
      <HeroNavyBackdrop />

      {isMobile ? (
        /* Mobile: fundo estático — sem transform para manter a foto nítida */
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroBackgroundImage ready={ready} />
          </motion.div>
          {overlays}
        </div>
      ) : (
        /* Desktop: parallax */
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <HeroBackgroundImage ready={ready} />
          </motion.div>
          {overlays}
        </motion.div>
      )}

      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-24 md:pt-32 lg:pb-28"
        style={isMobile ? undefined : { y: contentY }}
      >
        <RevealText index={0} ready={ready} blur={false} className="mb-5 md:mb-6">
          <p className="text-display-label flex flex-wrap items-center gap-x-3 text-xs md:text-sm">
            <span>DJ Open Format</span>
            <span className="text-foreground/20">/</span>
            <span>Brasil</span>
          </p>
        </RevealText>

        <motion.div
          className="mb-6 w-full max-w-full md:mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <h1 aria-label="Fig." className="max-w-full">
            <FigLogo size="hero" priority className="md:mx-0" />
          </h1>
        </motion.div>

        <RevealText index={2} ready={ready} blur={false} className="mb-8 max-w-md md:mb-10">
          <p className="font-sans text-sm leading-relaxed text-muted md:text-base">
            O set é agora.
            <br />
            Open format — de verdade.
          </p>
        </RevealText>

        <div className="flex max-w-full flex-wrap gap-2.5 md:gap-4">
          {actionLinks.map((link, i) => (
            <PremiumButton
              key={link.label}
              label={link.label}
              href={link.href}
              external={link.external}
              index={i}
              ready={ready}
              variant={link.label === "Booking" ? "primary" : "outline"}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-6 z-10 hidden md:right-10 md:block"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted/60">
            scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
