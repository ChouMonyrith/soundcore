"use client";

import React from "react";
import { useFilters } from "../sounds/layout";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function FilterButton() {
  const { setOpen } = useFilters();

  return (
    <div className="mt-3 md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 w-full text-black flex items-center justify-start gap-2"
      >
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
        Filters
      </button>
    </div>
  );
}
