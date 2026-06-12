"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { StageVideo } from "@/lib/data";
interface VideoCardProps {
  video: StageVideo;
  index: number;
  onOpen: (video: StageVideo) => void;
}

function PlayIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 14 16"
      fill="currentColor"
      className="translate-x-[1px]"
      aria-hidden="true"
    >
      <path d="M0 0v16l14-8L0 0z" />
    </svg>
  );
}

export function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    if (videoRef.current && video.video) {
      void videoRef.current.play();
    }
  };

  const handleLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-sm bg-black"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: (index % 3) * 0.07,
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(video)}
      data-cursor="ver"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        {video.video ? (
          <video
            ref={videoRef}
            src={video.video}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Image
            src={video.poster}
            alt={video.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <motion.div
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.92 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-display text-lg uppercase tracking-display-tight text-white md:text-xl">
            {video.title}
          </p>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-white/60 md:text-xs">
            {video.city}
          </p>
          <p className="mt-2 line-clamp-2 font-sans text-xs text-white/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-sm">
            {video.caption}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-5 right-5 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white/60 md:bottom-6 md:right-6 md:size-11">
        <PlayIcon />
      </div>
    </motion.article>
  );
}
