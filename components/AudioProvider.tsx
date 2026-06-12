"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getAudioInstance } from "@/lib/audio";

interface AudioContextValue {
  isPlaying: boolean;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}

interface AudioProviderProps {
  children: ReactNode;
  autoStart?: boolean;
}

export function AudioProvider({ children, autoStart = false }: AudioProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = getAudioInstance();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const play = useCallback(async () => {
    const audio = getAudioInstance();
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = getAudioInstance();
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    const audio = getAudioInstance();
    if (audio.paused) {
      void play();
    } else {
      pause();
    }
  }, [play, pause]);

  useEffect(() => {
    if (!autoStart || startedRef.current) return;
    startedRef.current = true;
    void play();
  }, [autoStart, play]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggle, play, pause }}>
      {children}
    </AudioContext.Provider>
  );
}
