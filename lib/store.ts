"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WeatherState {
  currentLocation: string;
  favoriteLocations: string[];
  lastUpdate: string;
  isMetric: boolean;
  setCurrentLocation: (location: string) => void;
  toggleFavorite: (location: string) => void;
  setLastUpdate: (time: string) => void;
  toggleUnit: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      currentLocation: '',
      favoriteLocations: [],
      lastUpdate: new Date().toISOString(),
      isMetric: true,
      setCurrentLocation: (location) => set({ currentLocation: location }),
      toggleFavorite: (location) =>
        set((state) => ({
          favoriteLocations: state.favoriteLocations.includes(location)
            ? state.favoriteLocations.filter((loc) => loc !== location)
            : [...state.favoriteLocations, location],
        })),
      setLastUpdate: (time) => set({ lastUpdate: time }),
      toggleUnit: () => set((state) => ({ isMetric: !state.isMetric })),
    }),
    {
      name: 'weather-storage',
    }
  )
);