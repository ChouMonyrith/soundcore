"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const bpmRanges = [
  { id: "60-90", label: "60–90", min: 60, max: 90 },
  { id: "90-110", label: "90–110", min: 90, max: 110 },
  { id: "110-140", label: "110–140", min: 110, max: 140 },
  { id: "140-160", label: "140–160", min: 140, max: 160 },
  { id: "160+", label: "160+", min: 160, max: null },
];

export default function BpmSidebar() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (range) => {
    const newValue = selected?.id === range.id ? null : range;

    const params = new URLSearchParams();
    if (newValue) {
      params.set("bpm_min", newValue.min);
      params.set("bpm_max", newValue.max);
    } else {
      params.delete("bpm_min");
      params.delete("bpm_max");
    }

    router.push(`${pathname}?${params.toString()}`);

    setSelected(newValue);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Tempo</h2>
      <div className="flex flex-wrap gap-3">
        {bpmRanges.map((range) => (
          <label
            key={range.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-sm border transition
              ${
                selected?.id === range.id
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            <input
              type="checkbox"
              checked={selected?.id === range.id}
              onChange={() => handleSelect(range)}
              className="hidden"
            />
            {range.label}
          </label>
        ))}
      </div>
    </div>
  );
}
