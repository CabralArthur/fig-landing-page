"use client";

import { motion } from "framer-motion";
import { playGenres } from "@/lib/data";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M1 13L13 1M13 1H4M13 1V10" />
    </svg>
  );
}

export function WhatIPlaySection() {
  return (
    <section id="estilos" className="bg-black px-5 py-20 text-foreground md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14 text-center md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto mb-5 h-px w-12 bg-foreground/40 md:mb-6" />
          <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] uppercase leading-none tracking-display-tight text-foreground">
            This is what I play
          </h2>
        </motion.div>

        <div className="border-t border-foreground/10">
          {playGenres.map((genre, i) => (
            <motion.div
              key={genre.id}
              className="group grid grid-cols-1 items-center gap-4 border-b border-foreground/10 py-8 md:grid-cols-[minmax(140px,1fr)_2fr_auto] md:gap-8 md:py-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <h3 className="font-display text-3xl uppercase tracking-display-tight text-foreground md:text-4xl lg:text-5xl">
                {genre.name}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted md:text-base">
                {genre.description}
              </p>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-all duration-500 group-hover:scale-105 group-hover:border-foreground/60 group-hover:bg-foreground group-hover:text-background md:justify-self-end">
                <ArrowIcon />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
