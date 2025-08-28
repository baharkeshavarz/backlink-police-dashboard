"use client";

import { useEffect, useRef } from "react";

interface VoicePlayerProps {
  voiceUrl: string;
  playbackKey?: string; // triggers audio restart
}

const VoicePlayer = ({ voiceUrl, playbackKey }: VoicePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!voiceUrl) return;

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.src = voiceUrl;
      audio.load();
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }, [playbackKey, voiceUrl]); // triggers whenever a new key is passed

  return <audio ref={audioRef} />;
};

export default VoicePlayer;
