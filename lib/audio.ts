const AUDIO_SRC = "/music/audio-fig.mp3";
const DEFAULT_VOLUME = 0.3;

let audioInstance: HTMLAudioElement | null = null;
let gestureUnlockAttached = false;
let isUnlocked = false;

export type AudioPlayState = "playing" | "playing-muted" | "blocked";

export function getAudioInstance(): HTMLAudioElement {
  if (typeof window === "undefined") {
    throw new Error("Audio is only available in the browser");
  }

  if (!audioInstance) {
    audioInstance = document.createElement("audio");
    audioInstance.src = AUDIO_SRC;
    audioInstance.loop = true;
    audioInstance.volume = DEFAULT_VOLUME;
    audioInstance.preload = "auto";
    audioInstance.setAttribute("playsinline", "");
    audioInstance.style.display = "none";
    document.body.appendChild(audioInstance);
  }

  return audioInstance;
}

export function destroyAudioInstance() {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.remove();
    audioInstance = null;
  }
}

export function isAudioUnlocked() {
  return isUnlocked;
}

export function unlockAudioWithGesture() {
  if (typeof window === "undefined") return;

  const audio = getAudioInstance();
  isUnlocked = true;
  audio.muted = false;
  audio.volume = DEFAULT_VOLUME;

  void audio.play().catch(() => {
    /* retry on next gesture */
  });
}

export function attachGestureUnlock() {
  if (gestureUnlockAttached || typeof window === "undefined") return;
  gestureUnlockAttached = true;

  const unlock = () => {
    unlockAudioWithGesture();
  };

  const events = ["pointerdown", "touchstart", "touchend", "click", "keydown"] as const;

  events.forEach((event) => {
    window.addEventListener(event, unlock, { capture: true, passive: true, once: true });
  });
}

export async function tryPlayAudio(): Promise<AudioPlayState> {
  const audio = getAudioInstance();

  if (isUnlocked) {
    audio.muted = false;
    audio.volume = DEFAULT_VOLUME;
    try {
      await audio.play();
      return "playing";
    } catch {
      /* fall through */
    }
  }

  audio.muted = false;
  audio.volume = DEFAULT_VOLUME;
  try {
    await audio.play();
    isUnlocked = true;
    return "playing";
  } catch {
    /* browsers block audible autoplay */
  }

  audio.muted = true;
  try {
    await audio.play();
    attachGestureUnlock();
    return "playing-muted";
  } catch {
    attachGestureUnlock();
    return "blocked";
  }
}

export async function startAudioPlayback(): Promise<boolean> {
  const state = await tryPlayAudio();
  return state !== "blocked";
}

export function preloadAudio() {
  if (typeof window === "undefined") return;
  getAudioInstance().load();
}
