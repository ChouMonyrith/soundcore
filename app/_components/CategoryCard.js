import Image from "next/image";

export default function CategoryCard({ category }) {
  const imgSrc =
    category.image_url && category.image_url !== ""
      ? category.image_url
      : "/no-image.png"; // fallback from /public

  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="relative w-[220px] h-[220px]">
        <Image
          src={imgSrc}
          fill
          alt={category.name}
          style={{ objectFit: "cover" }}
        />
      </div>

      <p className="text-lg font-semibold text-gray-800 hover:underline mt-2">
        {category.name}
      </p>
    </div>
  );
}
