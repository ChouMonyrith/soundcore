"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveformPlayer({ src, onPlayChange }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#8b5cf6",
      barWidth: 2,
      height: 60,
      cursorWidth: 0,
    });

    if (src) wavesurfer.current.load(src);

    const handlePlay = () => {
      setIsPlaying(true);
      onPlayChange?.(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPlayChange?.(false);
    };
    const handleFinish = () => setIsPlaying(false);

    wavesurfer.current.on("play", handlePlay);
    wavesurfer.current.on("pause", handlePause);
    wavesurfer.current.on("finish", handleFinish);

    return () => {
      if (wavesurfer.current && !wavesurfer.current.isDestroyed) {
        wavesurfer.current.destroy();
      }
    };
  }, [onPlayChange, src]);

  const togglePlay = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
  };

  return {
    waveformRef,
    isPlaying,
    togglePlay,
  };
}
