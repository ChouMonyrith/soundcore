"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoryCarousel({ categories }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const cardWidth = 260;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center"
      >
        <ChevronRight size={22} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth px-12"
      >
        {categories?.map((cat) => (
          <div key={cat.id} className="shrink-0 w-60 cursor-pointer">
            <div className="relative w-full h-[200px] rounded overflow-hidden">
              <Link href={`/sounds?category_id=${cat.id}`}>
                <Image
                  src={cat.image_url || "/blacklogo.png"}
                  alt={cat.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>

            <h3 className="text-lg font-semibold mt-3">{cat.name}</h3>
            <p className="text-gray-500 text-sm">
              {cat.asset_count?.toLocaleString() || 0} assets
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
