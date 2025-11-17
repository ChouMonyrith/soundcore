"use client";
import { ArrowDownTrayIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import WaveformView from "./WaveformView";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SoundCard({ sound }) {
  const waveformRef = useRef(null);
  const pathname = usePathname();
  const isDetailPage = pathname.includes(`/sounds/${sound.slug}`);

  // Expose togglePlay function from child
  const handleRefReady = (controls) => {
    waveformRef.current = controls;
  };

  const handleCardClick = () => {
    if (!waveformRef.current) return;
    waveformRef.current.togglePlay();
  };

  if (isDetailPage) {
    return (
      <div
        onClick={handleCardClick}
        className="w-full cursor-pointer select-none"
      >
        <WaveformView src={sound.preview_path} refCallback={handleRefReady} />
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 px-4 cursor-pointer w-full"
    >
      {/* Left: Title + Artist */}
      <div className="flex items-center gap-4 w-full lg:w-1/3">
        <div>
          <Link
            href={`/sounds/${sound.slug}`}
            className="font-semibold text-gray-800 truncate hover:underline"
          >
            {sound.title}
          </Link>
          <p className="text-sm text-gray-600 hover:underline">
            By {sound.artist?.name}
          </p>
        </div>
      </div>

      {/* Middle: Waveform */}
      <div className="w-full lg:w-1/2">
        <WaveformView src={sound.preview_path} refCallback={handleRefReady} />
      </div>

      {/* Right: BPM + Icons */}
      <div
        className="flex items-center space-x-8 justify-between w-full lg:w-1/6 lg:justify-end"
        onClick={(e) => e.stopPropagation()} // prevent triggering play on icon click
      >
        <span className="text-sm font-medium text-gray-500">
          {sound.bpm} BPM
        </span>
        <div className="flex items-center gap-4 text-gray-500">
          <BookmarkIcon className="h-6 w-6 cursor-pointer hover:text-purple-600 transition-colors duration-200" />
          <ArrowDownTrayIcon className="h-6 w-6 cursor-pointer hover:text-purple-600 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
}
