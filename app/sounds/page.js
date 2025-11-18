import NotFound from "@/public/notfound.png";
import Image from "next/image";
import SearchInput from "../_components/SearchInput";
import SoundGrid from "../_components/SoundGrid";
import { fetchSounds } from "../_utils/sound-api";
import { useFilters } from "./layout";
import FilterButton from "../_ui/filter-button";

export const metadata = {
  title: "All Sounds — SoundCore",
  description: "Search and explore all royalty-free sounds.",
  alternates: {
    canonical: "/sounds",
  },
};

export default async function Page({ searchParams: sp }) {
  const searchParams = await sp;

  const filters = {
    category_ids: searchParams.category_id?.split(",").map(Number) || [],
    bpm_min: searchParams.bpm_min ? parseInt(searchParams.bpm_min) : undefined,
    bpm_max: searchParams.bpm_max ? parseInt(searchParams.bpm_max) : undefined,
    search: searchParams.search,
    per_page: 15,
  };

  const sounds = await fetchSounds(filters);

  return (
    <>
      <SearchInput />
      <FilterButton />

      <div className="mt-4">
        {sounds.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-black p-4">
            <Image
              src={NotFound}
              alt="Sound not found"
              width={300} // Smaller default width
              height={300} // Smaller default height
            />
            <p className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mt-4">
              Sound not found.
            </p>
          </div>
        ) : (
          <SoundGrid sounds={sounds} />
        )}
      </div>
    </>
  );
}
