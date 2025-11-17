import CategoryCard from "./_components/CategoryCard";
import SearchInput from "./_components/SearchInput";
import SoundGrid from "./_components/SoundGrid";
import { fetchSounds, getParentCategories } from "./_utils/sound-api";

export default async function Page({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const categories = await getParentCategories();

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
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white p-10 md:p-16 text-center mx-4 my-4 shadow-sm">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Explore Royalty-Free{" "}
          <span className="text-yellow-500">&lt;Music/&gt;</span>
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8">
          Bring your video and music projects to life with our huge collection
          of high-quality, authentic audio tracks.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <SearchInput className="h-16" />
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          {[
            "background music",
            "background",
            "upbeat",
            "intro",
            "epic",
            "bieber",
          ].map((tag) => (
            <button
              key={tag}
              className="flex items-center gap-1 text-black bg-white cursor-pointer border rounded-full px-3 py-1 hover:bg-gray-100 transition"
            >
              🔥 {tag}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-orange-50 text-center my-5">
          <h2 className="text-2xl md:text-3xl font-bold">
            Top &lt;Categories/&gt;
          </h2>
          <p className="text-black mt-2 max-w-2xl mx-auto">
            Discover the latest assets across our most-loved categories.
          </p>
          <div className="flex overflow-x-auto justify-center items-center space-x-4 p-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="text-center my-5">
          <h2 className="text-2xl md:text-3xl font-bold">
            Most &lt;Popular/&gt;
          </h2>
          <p className="text-black mt-2 max-w-2xl mx-auto">
            Keep up with what the world is listening to and explore trending
            themes and tracks from our curated playlists.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500">
            Error fetching sounds: {error}
          </p>
        )}

        <div className="min-h-screen ">
          <SoundGrid sounds={sounds} />
        </div>
      </section>
    </div>
  );
}
