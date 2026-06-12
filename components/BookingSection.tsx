"use client";

import { motion } from "framer-motion";
import { bookingCtas } from "@/lib/data";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M3 13L13 3M13 3H5M13 3V11" />
    </svg>
  );
}

export function BookingSection() {
  return (
    <section id="booking" className="border-t border-foreground/10 bg-black px-5 py-20 text-foreground md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/45 md:text-xs">
            Disponível para eventos
          </p>
          <h2 className="font-display text-[clamp(2.75rem,9vw,6rem)] uppercase leading-[0.88] tracking-display-tight">
            Booking
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-foreground/60 md:text-base">
            Festas, clubes, festivais e eventos privados. Open format, energia de pista e presença de
            palco — do warm-up ao pico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border border-foreground/15 bg-foreground/15 md:grid-cols-2">
          {bookingCtas.map((cta, i) => (
            <motion.a
              key={cta.id}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 bg-black px-6 py-8 transition-colors hover:bg-foreground/[0.03] md:px-10 md:py-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              data-cursor="contratar"
            >
              <div className="flex items-center gap-5 md:gap-8">
                <span className="font-display text-lg uppercase tracking-display-wide text-foreground/40 md:text-xl">
                  {cta.title}
                </span>
                <span className="hidden h-8 w-px bg-foreground/15 md:block" aria-hidden="true" />
                <span className="font-display text-sm uppercase tracking-display-tight text-foreground md:text-base">
                  {cta.label}
                </span>
              </div>
              <span className="shrink-0 text-foreground/50 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
                <ArrowIcon />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
