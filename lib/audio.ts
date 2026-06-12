const AUDIO_SRC = "/music/audio-fig.mp3";
const DEFAULT_VOLUME = 0.3;

let audioInstance: HTMLAudioElement | null = null;

export function getAudioInstance(): HTMLAudioElement {
  if (typeof window === "undefined") {
    throw new Error("Audio is only available in the browser");
  }

  if (!audioInstance) {
    audioInstance = new Audio(AUDIO_SRC);
    audioInstance.loop = true;
    audioInstance.volume = DEFAULT_VOLUME;
    audioInstance.preload = "auto";
  }

  return audioInstance;
}

export function destroyAudioInstance() {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.src = "";
    audioInstance = null;
  }
}

export async function startAudioPlayback(): Promise<boolean> {
  const audio = getAudioInstance();
  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

export function preloadAudio() {
  if (typeof window === "undefined") return;
  getAudioInstance().load();
}
