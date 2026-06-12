"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PremiumButton } from "@/components/PremiumButton";
import { RevealText } from "@/components/RevealText";
import { useIsMobile } from "@/hooks/useIsMobile";
import { featuredTrack } from "@/lib/data";
import { cn } from "@/lib/utils";

const MARQUEE_LINES = [
  { id: "line-1", text: "FUNK TO YOU • FIG • SPOTIFY •", direction: "rtl" as const, speed: 38 },
  { id: "line-2", text: "LISTEN NOW • OPEN FORMAT • RECIFE •", direction: "ltr" as const, speed: 44 },
  { id: "line-3", text: "OUÇA AGORA • FUNK TO YOU • FIG •", direction: "ltr" as const, speed: 36, behind: true },
  { id: "line-4", text: "FUNK TO YOU • FIG • SPOTIFY •", direction: "rtl" as const, speed: 34 },
];

interface MarqueeLineProps {
  text: string;
  direction: "ltr" | "rtl";
  duration: number;
}

function MarqueeLine({ text, direction, duration }: MarqueeLineProps) {
  const segment = `${text}   `.repeat(6);

  return (
    <div className="w-full overflow-hidden py-1" aria-hidden="true">
      <motion.div
        className="marquee-track"
        animate={{ x: direction === "rtl" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <span className="marquee-segment text-outline-marquee font-display text-[clamp(2.75rem,9vw,8rem)] uppercase tracking-display-tight opacity-[0.32] md:text-[clamp(3rem,10vw,9rem)] md:opacity-[0.26]">
          {segment}
        </span>
        <span className="marquee-segment text-outline-marquee font-display text-[clamp(2.75rem,9vw,8rem)] uppercase tracking-display-tight opacity-[0.32] md:text-[clamp(3rem,10vw,9rem)] md:opacity-[0.26]">
          {segment}
        </span>
      </motion.div>
    </div>
  );
}

export function MusicFeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const marqueeDuration = (speed: number) => (isMobile ? speed * 1.3 : speed);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bannerY = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -20] : [40, -40]);
  const line1Y = useTransform(scrollYProgress, [0, 1], [12, -18]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [-8, 14]);
  const line3Y = useTransform(scrollYProgress, [0, 1], [10, -12]);
  const line4Y = useTransform(scrollYProgress, [0, 1], [-10, 16]);

  const lineY = [line1Y, line2Y, line3Y, line4Y];

  return (
    <section
      ref={sectionRef}
      id="musica"
      className="relative overflow-hidden bg-[#050508] py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(139,92,246,0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 15% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="flex w-full flex-col gap-6 md:gap-12">
          {MARQUEE_LINES.map((line, i) => (
            <motion.div
              key={line.id}
              style={{ y: lineY[i] }}
              className={cn("w-full", line.behind ? "z-[2]" : "z-[1]")}
            >
              <MarqueeLine
                text={line.text}
                direction={line.direction}
                duration={marqueeDuration(line.speed)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10">
        <RevealText once index={0} className="mb-4 text-center md:mb-6">
          <p className="text-display-label text-xs">Lançamento</p>
        </RevealText>

        <div className="relative flex min-h-[480px] items-center justify-center md:min-h-[620px]">
          <motion.article
            className="relative z-10 w-full max-w-md md:max-w-lg"
            style={{ y: bannerY }}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="group relative overflow-hidden rounded-sm border border-foreground/10 bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              data-cursor="ver"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={featuredTrack.cover}
                  alt={`${featuredTrack.title} — capa do single`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 90vw, 512px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.28em] text-[#1ed760] md:text-xs">
                  {featuredTrack.platform}
                </p>
                <h2 className="font-display text-3xl uppercase leading-none tracking-display-tight text-foreground md:text-4xl">
                  {featuredTrack.title}
                </h2>
                <p className="mt-1 font-display text-lg uppercase tracking-display-wide text-muted md:text-xl">
                  {featuredTrack.artist}
                </p>
              </div>

              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-purple/25 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-accent-blue/20 blur-3xl"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <PremiumButton
                label="Ouvir agora"
                href={featuredTrack.href}
                external
                variant="primary"
                ready
              />
            </motion.div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
