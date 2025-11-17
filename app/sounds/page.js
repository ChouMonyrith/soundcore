import Image from "next/image";
import NotFound from "@/public/notfound.png";
import CategorySidebar from "../_components/CategorySidebar";
import SearchInput from "../_components/SearchInput";
import SoundGrid from "../_components/SoundGrid";
import { fetchSounds } from "../_utils/sound-api";
import BpmSidebar from "../_components/BpmSidebar";

export default async function Page({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;

  const {
    category_id,
    price_min,
    price_max,
    bpm_min,
    bpm_max,
    key_signature,
    search,
  } = searchParams;

  const filters = {
    category_ids: category_id?.split(",").map(Number) || [],
    price_min: price_min ? parseFloat(price_min) : undefined,
    price_max: price_max ? parseFloat(price_max) : undefined,
    bpm_min: bpm_min ? parseInt(bpm_min) : undefined,
    bpm_max: bpm_max ? parseInt(bpm_max) : undefined,
    key_signature,
    search,
    per_page: 15,
  };

  let sounds = [];
  let error = null;

  try {
    sounds = await fetchSounds(filters);
  } catch (err) {
    console.error("Error fetching sounds:", err);
    error = err.message || "Failed to load sounds.";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 w-full min-h-screen">
      <div className="md:col-span-1 border-r border-gray-500">
        <CategorySidebar />
        <BpmSidebar />
      </div>

      <div className="md:col-span-3 w-full">
        <SearchInput />
        <div className="mt-4">
          {sounds.length === 0 ? (
            <div className="flex flex-col min-h-screen justify-center items-center text-red-500">
              <Image
                src={NotFound}
                alt="Sound not found"
                width={400}
                height={400}
                className="object-contain"
              />
              <p className="font-bold text-5xl mb-74">Sound not found.</p>
            </div>
          ) : (
            <SoundGrid sounds={sounds} error={error} />
          )}
        </div>
      </div>
    </div>
  );
}
