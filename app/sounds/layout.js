"use client";

import { createContext, useContext, useState } from "react";
import CategorySidebar from "@/app/_components/CategorySidebar";
import BpmSidebar from "@/app/_components/BpmSidebar";

const FilterContext = createContext();

export function useFilters() {
  return useContext(FilterContext);
}

export default function SoundsLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ open, setOpen }}>
      <div className="relative w-full">
        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Mobile Drawer */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-orange-50 shadow-lg z-50 transform transition-transform md:hidden 
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col p-4 space-y-4 mt-20">
            <CategorySidebar />
            <BpmSidebar />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 min-h-screen">
          <div className="hidden md:block md:col-span-1 border-r border-gray-500">
            <div className="flex flex-col p-4 space-y-4">
              <CategorySidebar />
              <BpmSidebar />
            </div>
          </div>

          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </FilterContext.Provider>
  );
}
