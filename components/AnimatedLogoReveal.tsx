"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FigLogoReveal } from "@/components/FigLogoReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  getRevealEndFontSize,
  getRevealLogoFontSize,
  getRevealScrollDistance,
} from "@/lib/revealLogo";

interface AnimatedLogoRevealProps {
  revealContent: ReactNode;
  children: ReactNode;
}

export function AnimatedLogoReveal({ revealContent, children }: AnimatedLogoRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const startFont = getRevealLogoFontSize(isMobile);
    if (wordmarkRef.current) {
      wordmarkRef.current.style.fontSize = `${startFont}px`;
    }
  }, [isMobile]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !pinRef.current ||
      !logoRef.current ||
      !wordmarkRef.current ||
      !glowRef.current ||
      !curtainRef.current ||
      !contentRef.current
    ) {
      return;
    }

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const startFont = getRevealLogoFontSize(isMobile);
      const endFont = getRevealEndFontSize(isMobile);
      const scrollDistance = getRevealScrollDistance(isMobile);
      const endBlur = isMobile ? 8 : 18;

      gsap.set(wordmarkRef.current, {
        fontSize: startFont,
        lineHeight: 0.86,
        force3D: false,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        filter: "blur(0px)",
        force3D: false,
      });

      gsap.set(glowRef.current, { opacity: 1 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: scrollDistance,
            scrub: isMobile ? 0.8 : 1.1,
            pin: pinRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(logoRef.current, { opacity: 1, duration: 0.08, ease: "power2.out" }, 0)
          .fromTo(
            wordmarkRef.current,
            { fontSize: startFont },
            { fontSize: endFont, ease: "none" },
            0
          )
          .fromTo(
            logoRef.current,
            { filter: "blur(0px)" },
            { filter: `blur(${endBlur}px)`, ease: "power2.in" },
            0.42
          )
          .fromTo(
            glowRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut" },
            0.5
          )
          .fromTo(
            curtainRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut" },
            0.55
          )
          .fromTo(
            logoRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut" },
            0.7
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: isMobile ? 16 : 30 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.5
          );
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      ctx?.revert();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-black"
      >
        <div ref={contentRef} className="absolute inset-0 z-0 opacity-0 will-change-[opacity,transform]">
          {revealContent}
        </div>

        <div
          ref={curtainRef}
          className="pointer-events-none absolute inset-0 z-10 bg-black"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-4">
          <div
            ref={glowRef}
            className="absolute h-[min(52vw,240px)] w-[min(52vw,240px)] rounded-full md:h-[min(38vw,360px)] md:w-[min(38vw,360px)]"
            style={{
              background:
                "radial-gradient(circle, rgba(245,240,232,0.07) 0%, rgba(10,47,110,0.12) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div
            ref={logoRef}
            className="relative flex max-w-full items-center justify-center will-change-[opacity,filter]"
          >
            <FigLogoReveal ref={wordmarkRef} />
          </div>
        </div>

        <motion.p
          className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-foreground/35 md:bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          role para revelar
        </motion.p>
      </div>

      {children}
    </section>
  );
}
