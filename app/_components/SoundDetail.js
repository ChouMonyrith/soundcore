"use client";

import { useRef } from "react";
import WaveformView from "@/app/_components/WaveformView";
import { BookmarkIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function SoundDetailClient({ sound }) {
  const waveformRef = useRef(null);

  const handleRefReady = (controls) => {
    waveformRef.current = controls;
  };

  return (
    <div>
      {/* --- Top Section: Waveform --- */}
      <h1 className="text-2xl font-bold mb-2">{sound.title}</h1>
      <p className="text-gray-500 mb-4">By {sound.artist.name}</p>

      <div
        className="cursor-pointer border border-gray-300 rounded-xl p-3 bg-white shadow-sm"
        onClick={() => waveformRef.current?.togglePlay()}
      >
        <WaveformView src={sound.preview_path} refCallback={handleRefReady} />
      </div>

      {/* --- Bottom Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{sound.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {sound.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="text-3xl font-bold">${sound.price ?? "Free"}</div>

          <button className="flex items-center gap-2 font-bold bg-orange-50 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition">
            <ArrowDownIcon className="w-5 h-5" /> Buy Now
          </button>

          <button className="flex items-center gap-2 font-bold bg-orange-50 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition">
            <BookmarkIcon className="w-5 h-5" /> Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
