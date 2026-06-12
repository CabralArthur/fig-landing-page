"use client";

import { motion } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcon";
import { footerColumns, socialLinks } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-black px-5 pb-8 pt-16 text-foreground md:px-10 md:pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Listen me */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <h3 className="mb-8 text-center font-sans text-xl italic text-foreground/90 md:text-2xl">
            Listen Me
          </h3>

          <div className="mx-auto flex w-fit max-w-full justify-center border border-foreground/15">
            {socialLinks.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={[
                  "flex h-14 w-14 items-center justify-center text-foreground/70 transition-colors hover:bg-foreground/[0.04] hover:text-foreground sm:h-16 sm:w-16",
                  i > 0 ? "border-l border-foreground/15" : "",
                ].join(" ")}
                data-cursor="ver"
              >
                <SocialIcon id={link.id} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact columns */}
        <motion.div
          className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-foreground/10 py-12 md:grid-cols-4 md:gap-x-10 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-foreground md:text-sm">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="font-sans text-xs text-foreground/50 transition-colors hover:text-foreground md:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Legal bar */}
        <div className="border-t border-foreground/10 pt-8">
          <p className="flex items-center justify-center gap-2 font-sans text-[11px] text-foreground/40 md:justify-start md:text-xs">
            <span className="font-fig text-sm tracking-[-0.03em] text-foreground/60">Fig.</span>
            <span>© {year} FIG. Todos os direitos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
