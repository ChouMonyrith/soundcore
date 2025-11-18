import { getSoundBySlug } from "@/app/_utils/sound-api";
import Breadcrumbs from "@/app/_components/BreadCrumbs";
import SoundDetail from "@/app/_components/SoundDetail";

export async function generateMetadata({ params }) {
  const sound = await getSoundBySlug(params.slug);

  return {
    title: `${sound.title} | ${sound.artist.name}`,
    description: sound.description?.slice(0, 150),
  };
}

export default async function SoundDetailPage({ params }) {
  const sound = await getSoundBySlug(params.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Sounds", href: "/sounds" },
    { label: sound.category.name, href: `/categories/${sound.category.slug}` },
    { label: sound.title },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 h-screen">
      <Breadcrumbs items={breadcrumbs} />

      <SoundDetail sound={sound} />
    </div>
  );
}
