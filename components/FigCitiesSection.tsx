"use client";

import { motion } from "framer-motion";
import { playedCities } from "@/lib/data";

const ease = [0.76, 0, 0.24, 1] as const;

export function FigCitiesSection() {
  return (
    <section id="cidades" className="bg-black px-5 py-20 text-foreground md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col gap-6 border-b border-foreground/10 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
        >
          <div>
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:text-xs">
              Pelo Brasil
            </p>
            <h2 className="font-display text-[clamp(2.75rem,9vw,6rem)] uppercase leading-[0.88] tracking-display-tight text-foreground">
              JÁ TOCOU
              <br />
              EM
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-muted md:text-base">
            Clubes, festivais e eventos em cidades de Norte a Sudeste — com a mesma energia de pista.
          </p>
        </motion.div>

        <div className="border-t border-foreground/10">
          {playedCities.map((location, i) => (
            <motion.div
              key={location.id}
              className="group grid grid-cols-1 items-baseline gap-2 border-b border-foreground/10 py-7 md:grid-cols-[1fr_auto] md:gap-8 md:py-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease }}
            >
              <h3 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] uppercase leading-none tracking-display-tight text-foreground transition-colors duration-300 group-hover:text-foreground/80">
                {location.city}
              </h3>
              {location.detail ? (
                <p className="font-sans text-sm uppercase tracking-[0.18em] text-muted md:text-right md:text-base">
                  {location.detail}
                </p>
              ) : (
                <span className="hidden md:block" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
