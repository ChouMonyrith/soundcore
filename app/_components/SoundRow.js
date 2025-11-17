"use client";

import SoundCard from "./SoundCard";

export default function SoundRow({ title, assetCount, sounds }) {
  return (
    <div className="mt-12 border-b pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-500 text-sm">
            {assetCount.toLocaleString()} assets
          </p>
        </div>

        <button className="text-black text-sm font-medium hover:underline">
          Show all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(sounds) && sounds.length > 0 ? (
          sounds.map((sound) => <SoundCard key={sound.id} sound={sound} />)
        ) : (
          <p>No sounds found in this category.</p>
        )}
      </div>
    </div>
  );
}
