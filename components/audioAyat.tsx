"use client";

import { useRef, useState } from "react";
import { getWordAudioUrl } from "@/lib/quranAudio";

interface AudioAyatProps {
  surah: number;
  ayat: number;
  positions: number[];
}

export default function AudioAyat({ surah, ayat, positions }: AudioAyatProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    if (positions.length === 0) return;

    setIsPlaying(true);

    for (const position of positions) {
      const audioUrl = getWordAudioUrl(surah, ayat, position);

      const audio = new Audio(audioUrl);

      audioRef.current = audio;

      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();

        audio.play().catch(() => resolve());
      });
    }

    setIsPlaying(false);
    audioRef.current = null;
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={isPlaying ? stopAudio : playAudio}
      className="flex items-center justify-center"
      aria-label={isPlaying ? "Berhenti" : "Dengarkan audio"}
    >
      {isPlaying ? "⏹️" : "🔊"}
    </button>
  );
}
