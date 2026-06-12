import { cn } from "@/lib/utils";

export function GrainOverlay({ className }: { className?: string }) {
  return <div className={cn("grain", className)} aria-hidden="true" />;
}
