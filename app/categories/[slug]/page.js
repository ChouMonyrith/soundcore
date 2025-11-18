import Breadcrumbs from "@/app/_components/BreadCrumbs";
import { getCategoryBySlug } from "@/app/_utils/sound-api";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);

  return {
    title: `${category.name} Sounds`,
    description: category.description ?? "Browse audio by category.",
    openGraph: {
      title: `${category.name} Sounds`,
      description: category.description,
      images: [
        {
          url: category.image_url,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params; // Get the slug from the URL

  const parentCategory = await getCategoryBySlug(slug);
  const allCategories = await getAllCategories();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name }, // current
  ];

  if (!parentCategory) {
    return <div>Category not found</div>; // Handle 404
  }

  // Fetch all categories to find the children

  // Filter to find children of this parent
  const childCategories = allCategories.filter(
    (cat) => cat.parent_id === parentCategory.id
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      {/* Header showing the parent category name */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {parentCategory.name}
      </h1>

      {/* Grid for child categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {childCategories.map((childCategory) => (
          <Link
            key={childCategory.id}
            href={`/categories/${childCategory.slug}`}
          >
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                {childCategory.image_url ? (
                  <Image
                    src={childCategory.image_url}
                    alt={childCategory.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2 truncate w-full text-center group-hover:text-blue-600">
                {childCategory.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
