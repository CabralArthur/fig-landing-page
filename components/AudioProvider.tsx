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
import {
  attachGestureUnlock,
  getAudioInstance,
  tryPlayAudio,
  unlockAudioWithGesture,
} from "@/lib/audio";

interface AudioContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
  unlock: () => void;
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

function syncPlayingState(
  audio: HTMLAudioElement,
  setIsPlaying: (value: boolean) => void,
  setIsMuted: (value: boolean) => void
) {
  setIsPlaying(!audio.paused);
  setIsMuted(audio.muted);
}

export function AudioProvider({ children, autoStart = false }: AudioProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const autoStartRef = useRef(false);

  useEffect(() => {
    const audio = getAudioInstance();

    const onPlay = () => syncPlayingState(audio, setIsPlaying, setIsMuted);
    const onPause = () => syncPlayingState(audio, setIsPlaying, setIsMuted);
    const onVolumeChange = () => syncPlayingState(audio, setIsPlaying, setIsMuted);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("volumechange", onVolumeChange);

    attachGestureUnlock();

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  const play = useCallback(async () => {
    const audio = getAudioInstance();
    const state = await tryPlayAudio();
    syncPlayingState(audio, setIsPlaying, setIsMuted);

    if (state === "blocked") {
      unlockAudioWithGesture();
    }
  }, []);

  const pause = useCallback(() => {
    const audio = getAudioInstance();
    audio.pause();
    setIsPlaying(false);
  }, []);

  const unlock = useCallback(() => {
    unlockAudioWithGesture();
    const audio = getAudioInstance();
    syncPlayingState(audio, setIsPlaying, setIsMuted);
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
    if (!autoStart || autoStartRef.current) return;
    autoStartRef.current = true;

    void play();

    const retryMs = [400, 900, 1800, 3200];
    const timers = retryMs.map((delay) =>
      window.setTimeout(() => {
        const audio = getAudioInstance();
        if (audio.paused || audio.muted) {
          void play();
        }
      }, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [autoStart, play]);

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, toggle, play, pause, unlock }}>
      {children}
    </AudioContext.Provider>
  );
}
