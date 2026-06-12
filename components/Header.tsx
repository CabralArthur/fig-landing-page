"use client";

import { MagneticButton } from "@/components/MagneticButton";

const nav = [
  { label: "Música", href: "#musica" },
  { label: "Vídeos", href: "#videos" },
];

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <MagneticButton href="#hero" strength={0.2}>
        <span className="font-fig text-xl tracking-[-0.03em] text-foreground md:text-2xl">
          Fig.
        </span>
      </MagneticButton>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <MagneticButton key={item.href} href={item.href} strength={0.15}>
            <span className="font-display text-sm uppercase tracking-display-wide text-muted transition-colors hover:text-foreground">
              {item.label}
            </span>
          </MagneticButton>
        ))}
      </nav>

      <MagneticButton href="#booking" strength={0.2} data-cursor="contratar">
        <span className="font-display text-sm uppercase tracking-display-wide text-muted transition-colors hover:text-foreground">
          Booking
        </span>
      </MagneticButton>
    </header>
  );
}
