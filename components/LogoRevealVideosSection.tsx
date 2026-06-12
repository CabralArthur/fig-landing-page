"use client";

import { AnimatedLogoReveal } from "@/components/AnimatedLogoReveal";
import { FigCitiesSection } from "@/components/FigCitiesSection";
import { FigOnStageSection } from "@/components/FigOnStageSection";
import { QuemEFigSection } from "@/components/QuemEFigSection";
import { WhatIPlaySection } from "@/components/WhatIPlaySection";

export function LogoRevealVideosSection() {
  return (
    <AnimatedLogoReveal revealContent={<QuemEFigSection compact animateEntry={false} />}>
      <WhatIPlaySection />
      <FigOnStageSection />
      <FigCitiesSection />
    </AnimatedLogoReveal>
  );
}
