import { FigWordmark } from "@/components/FigWordmark";
import { LOGO_FIG_PNG } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface FigLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
}

const heroSize = {
  width: 480,
  height: 480,
  className:
    "h-auto w-[min(72vw,280px)] max-w-full md:w-auto md:h-[clamp(7rem,22vw,18rem)]",
};

export function FigLogo({ className, size = "md", priority = false }: FigLogoProps) {
  if (size === "hero") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={LOGO_FIG_PNG}
        alt="Fig."
        width={heroSize.width}
        height={heroSize.height}
        draggable={false}
        fetchPriority={priority ? "high" : undefined}
        className={cn("max-w-full object-contain", heroSize.className, className)}
      />
    );
  }

  return <FigWordmark size={size} className={cn("max-w-full", className)} />;
}
