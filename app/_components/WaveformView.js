"use client";
import { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function WaveformView({ src, refCallback }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#000",
      barWidth: 2,
      height: 60,
      cursorWidth: 0,
      backend: "MediaElement",
    });

    if (src) wavesurfer.current.load(src);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    wavesurfer.current.on("finish", () => setIsPlaying(false));

    if (refCallback) {
      refCallback({
        togglePlay: () => wavesurfer.current.playPause(),
      });
    }

    return () => {
      if (wavesurfer.current && !wavesurfer.current.isDestroyed) {
        wavesurfer.current.destroy();
      }
    };
  }, [refCallback, src]);

  return (
    <div className="flex items-center gap-3 w-full">
      {isPlaying ? (
        <PauseIcon className="h-5 w-5 text-black" />
      ) : (
        <PlayIcon className="h-5 w-5 text-gray-700 hover:scale-110" />
      )}
      <div ref={waveformRef} className="flex-1 cursor-pointer" />
    </div>
  );
}
