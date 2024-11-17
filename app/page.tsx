"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrentWeather } from "@/components/weather/current-weather";
import { ForecastCard } from "@/components/weather/forecast-card";
import { SearchLocation } from "@/components/weather/search-location";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    // Will implement API call here
    console.log("Searching for:", city);
  };

  const forecasts = [
    { day: "Besok", condition: "sunny", temperature: 33, rainChance: 10 },
    { day: "Selasa", condition: "cloudy", temperature: 31, rainChance: 30 },
    { day: "Rabu", condition: "rainy", temperature: 29, rainChance: 80 },
    { day: "Kamis", condition: "cloudy", temperature: 30, rainChance: 40 },
  ] as const;

  return (
    <main className="min-h-screen tropical-gradient p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cuaca Indonesia
          </h1>
          <ThemeToggle />
        </div>

        {/* Search */}
        <SearchLocation
          value={city}
          onChange={setCity}
          onSearch={handleSearch}
        />

        {/* Current Weather */}
        <CurrentWeather
          city="Jakarta"
          temperature={32}
          condition="Cerah Berawan"
          humidity={75}
          windSpeed={12}
          uvIndex={8}
          rainChance={30}
        />

        {/* Forecast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {forecasts.map((forecast) => (
            <ForecastCard key={forecast.day} {...forecast} />
          ))}
        </div>
      </div>
    </main>
  );
}