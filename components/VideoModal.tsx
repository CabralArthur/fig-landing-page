"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { StageVideo } from "@/lib/data";

interface VideoModalProps {
  video: StageVideo | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  useEffect(() => {
    if (video?.video && videoRef.current) {
      void videoRef.current.play();
    }
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Vídeo — ${video.title}`}
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-sm bg-black"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 font-sans text-sm text-white backdrop-blur-md transition-colors hover:bg-white/10"
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="relative aspect-video w-full bg-black">
              {video.video ? (
                <video
                  ref={videoRef}
                  src={video.video}
                  poster={video.poster}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  unoptimized
                />
              )}
            </div>

            <div className="border-t border-white/10 p-5 md:p-7">
              <p className="font-display text-2xl uppercase tracking-display-tight text-white md:text-3xl">
                {video.title}
              </p>
              <p className="mt-1 font-sans text-sm text-white/60">{video.city}</p>
              <p className="mt-3 font-sans text-sm text-white/80">{video.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
