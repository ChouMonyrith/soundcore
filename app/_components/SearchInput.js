"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SearchInput({ className }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);

      params.delete("page");
    } else {
      params.delete("search");
    }

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the trimmed inputValue to handleSearch
    handleSearch(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      // Pass the trimmed inputValue to handleSearch
      handleSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    handleSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-xl mx-auto flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-4 py-2 
                 transition-all duration-200
                 focus-within:border-purple-500
                 focus-within:ring-2
                 focus-within:ring-purple-300 ${className}`}
    >
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="search"
        type="text"
        placeholder="Search"
        className="flex-1 px-3 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
      />
      {inputValue && inputValue.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="text-sm font-medium text-gray-600 hover:text-purple-600 transition"
        >
          Clear
        </button>
      )}
    </form>
  );
}
