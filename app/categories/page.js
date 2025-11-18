import {
  fetchSounds,
  getAllCategories,
  getTop5Sounds,
} from "@/app/_utils/sound-api";
import CategorySlider from "../_components/CategorySlider";
import SoundRow from "../_components/SoundRow";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Categories — SoundCore",
  description: "Search and explore all royalty-free sounds.",
  alternates: {
    canonical: "/sounds",
  },
};

export default async function CategoriesPage() {
  const [categories, sounds] = await Promise.all([
    await getAllCategories(),
    await getTop5Sounds(),
  ]);

  const soundEffectCategoryObject = sounds.data.find(
    (item) => item.category === "SoundEffect"
  );
  const musicCategoryObject = sounds.data.find(
    (item) => item.category === "Music"
  );

  const soundEffectSounds = soundEffectCategoryObject?.top_sounds || [];
  const musicSounds = musicCategoryObject?.top_sounds || [];

  return (
    <div className="max-w-6xl mx-auto mt-10 min-h-screen">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Browse by category</h2>
        <p className="text-gray-500 text-sm">26,605,863 assets</p>
      </div>

      <CategorySlider categories={categories} />

      <SoundRow title="Music" assetCount={362769} sounds={musicSounds} />

      <SoundRow
        title="Sound Effects"
        assetCount={925039}
        sounds={soundEffectSounds}
      />
    </div>
  );
}
