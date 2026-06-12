"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { stageVideos, type StageVideo } from "@/lib/data";

export function FigOnStageSection() {
  const [activeVideo, setActiveVideo] = useState<StageVideo | null>(null);

  return (
    <>
      <section id="videos" className="bg-foreground px-5 pb-20 pt-12 text-background md:px-10 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 flex flex-col gap-6 border-b border-background/15 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div>
              <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-background/50 md:text-xs">
                Live moments
              </p>
              <h2 className="font-display text-[clamp(2.75rem,9vw,6rem)] uppercase leading-[0.88] tracking-display-tight text-background">
                FIG ON
                <br />
                STAGE
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-background/65 md:text-base">
              Sets ao vivo, energia de pista e a presença do FIG em eventos pelo Brasil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {stageVideos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onOpen={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
