"use client";

import { AnimatedLogoReveal } from "@/components/AnimatedLogoReveal";
import { FigOnStageSection } from "@/components/FigOnStageSection";
import { QuemEFigSection } from "@/components/QuemEFigSection";
import { WhatIPlaySection } from "@/components/WhatIPlaySection";

export function LogoRevealVideosSection() {
  return (
    <AnimatedLogoReveal revealContent={<QuemEFigSection compact />}>
      <WhatIPlaySection />
      <FigOnStageSection />
    </AnimatedLogoReveal>
  );
}
