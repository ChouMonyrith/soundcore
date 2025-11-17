"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_ui/accordion";
import { Checkbox } from "@/app/_ui/checkbox";
import { Label } from "@/app/_ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCategoryId =
    searchParams.get("category_id")?.split(",").map(Number) || [];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Raw API data:", data);

        const flatCategories = data.categories || [];

        const categoryMap = new Map();
        flatCategories.forEach((cat) => {
          categoryMap.set(cat.id, { ...cat, subcategories: [] });
        });

        const nestedCategories = [];
        flatCategories.forEach((cat) => {
          const categoryWithSubs = categoryMap.get(cat.id);
          if (cat.parent_id) {
            const parentCategory = categoryMap.get(cat.parent_id);
            if (parentCategory) {
              parentCategory.subcategories.push(categoryWithSubs);
            }
          } else {
            nestedCategories.push(categoryWithSubs);
          }
        });

        console.log("Nested categories:", nestedCategories);
        setCategories(nestedCategories);
      } catch (error) {
        console.error("Failed to fetch or process categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryId, checked) => {
    let newCategoryId;

    if (checked) {
      newCategoryId = [...new Set([...urlCategoryId, categoryId])];
    } else {
      newCategoryId = urlCategoryId.filter((id) => id !== categoryId);
    }

    const params = new URLSearchParams();
    if (newCategoryId.length > 0) {
      params.set("category_id", newCategoryId.join(","));
    } else {
      params.delete("category_id");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Categories</h2>
        {urlCategoryId.length > 0 && (
          <button
            className="text-xs font-bold hover:underline"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("category_id");
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div className="min-h-full">
        <Accordion type="single" collapsible>
          {categories.map((cat) => {
            const isParentSelected = urlCategoryId.includes(cat.id);
            const areAllSubcategoriesSelected =
              cat.subcategories.length > 0 &&
              cat.subcategories.every((sub) => urlCategoryId.includes(sub.id));
            const isIndeterminate =
              !isParentSelected &&
              cat.subcategories.some((sub) => urlCategoryId.includes(sub.id));
            const isChecked = isParentSelected || areAllSubcategoriesSelected;

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id.toString()}
                className="flex flex-col border-b border-gray-300"
              >
                <AccordionTrigger className="text-md font-medium flex items-center w-full">
                  <div className="flex items-center grow">{cat.name}</div>
                </AccordionTrigger>
                <AccordionContent>
                  {cat.subcategories && cat.subcategories.length > 0 ? (
                    cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center space-x-2 mt-1 ml-4"
                      >
                        <Checkbox
                          id={`sub-${sub.id}`}
                          checked={urlCategoryId.includes(sub.id)} // Check state comes from URL params
                          onCheckedChange={(checked) =>
                            handleCategoryToggle(sub.id, checked)
                          } // Update URL params
                        />
                        <Label htmlFor={`sub-${sub.id}`} className="text-sm">
                          {sub.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 ml-4">
                      No subcategories
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
