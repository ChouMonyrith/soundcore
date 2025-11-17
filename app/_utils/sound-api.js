import axios from "axios";
import React from "react";

export async function fetchSounds(filters) {
  const params = new URLSearchParams();

  if (filters.category_ids?.length > 0)
    params.append("category_id", filters.category_ids.join(","));

  if (filters.search) params.append("search", filters.search);

  if (filters.bpm_min && filters.bpm_max) {
    params.append("bpm_min", filters.bpm_min);
    params.append("bpm_max", filters.bpm_max);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sounds?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API error: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  return data.sounds;
}

export async function getTop5Sounds() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/music-and-sound/top-sounds`
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      throw new Error(`Network Error: ${error.message}`);
    }
  }
}

export async function getSoundBySlug(slug) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sounds/${slug}`
    );

    return res.data.sound;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      throw new Error(`Network Error: ${error.message}`);
    }
  }
}

export async function fetchFeaturedSounds() {
  // Example: Fetch from your Laravel API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sounds?per_page=8&featured=true`
  ); // Example API call
  if (!res.ok) {
    throw new Error("Failed to fetch featured sounds");
  }
  const data = await res.json();
  return data.sounds;
}

export async function getParentCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?top_level=true`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );

    return res.data.categories;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      throw new Error(`Network Error: ${error.message}`);
    }
  }
}

export async function getCategoryBySlug(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${slug}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}
