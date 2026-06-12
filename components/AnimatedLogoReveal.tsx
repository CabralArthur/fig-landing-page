"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
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
      !overlayRef.current ||
      !hintRef.current ||
      !contentRef.current
    ) {
      return;
    }

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const startFont = getRevealLogoFontSize(isMobile);
      const endFont = getRevealEndFontSize(isMobile);
      const scrollDistance = getRevealScrollDistance(isMobile);
      const endBlur = isMobile ? 6 : 18;

      gsap.set(wordmarkRef.current, {
        fontSize: startFont,
        lineHeight: 0.86,
        force3D: false,
      });

      gsap.set(logoRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        force3D: false,
      });

      gsap.set(glowRef.current, { opacity: 1 });
      gsap.set(curtainRef.current, { opacity: 1 });
      gsap.set(overlayRef.current, { autoAlpha: 1 });
      gsap.set(hintRef.current, { opacity: 1 });
      gsap.set(contentRef.current, { opacity: 0, y: isMobile ? 12 : 24 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: scrollDistance,
            scrub: isMobile ? 0.65 : 1.1,
            pin: pinRef.current,
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: true,
            fastScrollEnd: isMobile,
          },
        });

        tl.fromTo(
          wordmarkRef.current,
          { fontSize: startFont },
          { fontSize: endFont, ease: "none", duration: 1 },
          0
        )
          .fromTo(
            hintRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.out", duration: 0.12 },
            0.08
          )
          .fromTo(
            logoRef.current,
            { filter: "blur(0px)" },
            { filter: `blur(${endBlur}px)`, ease: "power2.in", duration: 0.35 },
            isMobile ? 0.32 : 0.42
          )
          .fromTo(
            glowRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut", duration: 0.28 },
            isMobile ? 0.36 : 0.5
          )
          .fromTo(
            curtainRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut", duration: 0.32 },
            isMobile ? 0.38 : 0.55
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: isMobile ? 12 : 24 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.38 },
            isMobile ? 0.36 : 0.5
          )
          .fromTo(
            logoRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "power2.inOut", duration: 0.22 },
            isMobile ? 0.48 : 0.7
          )
          .to(
            overlayRef.current,
            { autoAlpha: 0, ease: "none", duration: 0.01 },
            isMobile ? 0.72 : 0.88
          );
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    void init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-black"
      >
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5] opacity-0 will-change-[opacity,transform]"
        >
          {revealContent}
        </div>

        <div ref={overlayRef} className="absolute inset-0 z-20">
          <div
            ref={curtainRef}
            className="pointer-events-none absolute inset-0 bg-black"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-4">
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

          <p
            ref={hintRef}
            className="pointer-events-none absolute bottom-6 left-0 right-0 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-foreground/35 md:bottom-10"
          >
            role para revelar
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}
