"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
            )}

            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline hover:text-purple-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
