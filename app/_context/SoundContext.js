// contexts/SoundContext.js or providers/SoundProvider.js
"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [sounds, setSounds] = useState([]); // All sounds fetched initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // --- New State for Filters ---
  const [filters, setFilters] = useState({
    categoryIds: [], // Array of selected category IDs
    // Add other filter states here later if needed
    // priceMin: null,
    // priceMax: null,
    // bpmMin: null,
    // bpmMax: null,
    // keySignature: '',
  });

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch ALL sounds initially (or a large set)
        // Consider pagination later if the list is huge
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sounds`
        ); // Adjust as needed
        setSounds(response.data.sounds || []);
      } catch (err) {
        console.error("Error fetching sounds:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load sounds."
        );
        setSounds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSounds();
  }, []); // Fetch once on mount

  // --- New Function: Apply Filters ---
  const applyFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // --- New Function: Clear Filters ---
  const clearFilters = () => {
    setFilters({
      categoryIds: [],
      // priceMin: null,
      // priceMax: null,
      // bpmMin: null,
      // bpmMax: null,
      // keySignature: '',
    });
  };

  // --- Calculate Filtered Sounds using useMemo for performance ---
  const filteredSounds = useMemo(() => {
    if (loading || error) {
      // If still loading or there's an error, return empty array or original sounds
      return sounds;
    }

    return sounds.filter((sound) => {
      // Filter by category IDs
      if (
        filters.categoryIds.length > 0 &&
        !filters.categoryIds.includes(sound.category_id)
      ) {
        return false;
      }

      // Add other filter conditions here as you implement them
      // Example for price range (assuming filters has priceMin, priceMax):
      // if (filters.priceMin !== null && sound.price < filters.priceMin) return false;
      // if (filters.priceMax !== null && sound.price > filters.priceMax) return false;

      // Example for BPM range (assuming filters has bpmMin, bpmMax):
      // if (filters.bpmMin !== null && sound.bpm < filters.bpmMin) return false;
      // if (filters.bpmMax !== null && sound.bpm > filters.bpmMax) return false;

      // Example for key signature (assuming filters has keySignature):
      // if (filters.keySignature && sound.key_signature !== filters.keySignature) return false;

      // If all filters pass, include the sound
      return true;
    });
  }, [sounds, loading, error, filters]); // Recalculate when sounds, loading, error, or filters change

  const refetchSounds = async () => {
    // You might want to refetch the *full* list or just re-apply filters
    // For now, let's just refetch the full list and filters will be reapplied automatically by useMemo
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sounds?per_page=100`
      );
      setSounds(response.data.sounds || []);
    } catch (err) {
      console.error("Error refetching sounds:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to reload sounds."
      );
      // Keep existing sounds or clear them based on preference
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    sounds, // Original, unfiltered list
    filteredSounds, // List after applying filters
    loading,
    error,
    filters, // Expose current filter state
    applyFilters, // Expose function to update filters
    clearFilters, // Expose function to clear filters
    refetch: refetchSounds,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSounds must be used within a SoundProvider");
  }
  return context;
};
