"use client";
import WaveformView from "@/app/_components/WaveformView";
import { getSoundBySlug } from "@/app/_utils/sound-api";
import { ArrowDownIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useRef, useState } from "react";

export default function SoundDetailPage({ params }) {
  const { slug } = use(params);
  const [sound, setSound] = useState(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await getSoundBySlug(slug);
      setSound(data);
    })();
  }, [slug]);

  const handleRefReady = (controls) => {
    waveformRef.current = controls;
  };

  if (!sound) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="container max-w-7xl min-h-screen mx-auto px-4 py-8">
      {/* --- Top Section: Waveform --- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{sound.title}</h1>
        <p className="text-gray-500 mb-4">By {sound.artist.name}</p>

        <div
          className="cursor-pointer border  border-gray-300 rounded-xl p-3 bg-white shadow-sm"
          onClick={() => waveformRef.current?.togglePlay()}
        >
          <WaveformView src={sound.preview_path} refCallback={handleRefReady} />
        </div>
      </div>

      {/* --- Bottom Section: Description / Tags / Price --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Description + Tags */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {sound.description || "No description available."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {sound.tags?.length ? (
                sound.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No tags</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Price + Favorite */}
        <div className="flex flex-col justify-start items-start md:items-end gap-4">
          <div className="text-3xl font-bold text-gray-900">
            ${sound.price ?? "Free"}
          </div>
          <button className="flex font-bold items-center cursor-pointer gap-2 bg-orange-50 border-black text-black border-2 px-4 py-2 hover:bg-black hover:text-white transition">
            <ArrowDownIcon className="w-5 h-5 " />
            But Now
          </button>
          <button className="flex font-bold items-center cursor-pointer gap-2 bg-orange-50 border-black text-black border-2 px-4 py-2 hover:bg-black hover:text-white transition">
            <BookmarkIcon className="w-5 h-5" />
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
