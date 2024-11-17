"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Wind, Droplets, Sun, Umbrella, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/lib/store";
import { TemperatureChart } from "./temperature-chart";

interface CurrentWeatherProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  rainChance: number;
}

export function CurrentWeather({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  uvIndex,
  rainChance,
}: CurrentWeatherProps) {
  const { favoriteLocations, toggleFavorite, lastUpdate, setLastUpdate } = useWeatherStore();
  const isFavorite = favoriteLocations.includes(city);
  const [mounted, setMounted] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString());
      if (Date.now() - new Date(lastUpdate).getTime() > 5 * 60 * 1000) {
        setLastUpdate(new Date().toISOString());
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [lastUpdate, setLastUpdate]);

  // Prevent hydration mismatch by not rendering time until mounted
  const timeDisplay = mounted ? (
    <div className="text-sm text-muted-foreground mt-1">
      Pembaruan terakhir: {localTime}
    </div>
  ) : null;

  return (
    <Card className="glass-effect p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{city}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(city)}
              className="rounded-full"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="weather-icon">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <Sun className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold">{temperature}°C</div>
              <div className="text-muted-foreground">{condition}</div>
              {timeDisplay}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <WeatherStat
              icon={<Wind className="h-5 w-5" />}
              label="Kecepatan Angin"
              value={`${windSpeed} km/h`}
            />
            <WeatherStat
              icon={<Droplets className="h-5 w-5" />}
              label="Kelembaban"
              value={`${humidity}%`}
            />
            <WeatherStat
              icon={<Sun className="h-5 w-5" />}
              label="Indeks UV"
              value={`${uvIndex}/10`}
            />
            <WeatherStat
              icon={<Umbrella className="h-5 w-5" />}
              label="Kemungkinan Hujan"
              value={`${rainChance}%`}
            />
          </div>
        </div>

        <TemperatureChart />
      </div>
    </Card>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}