"use client";

import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface ForecastCardProps {
  day: string;
  condition: "sunny" | "cloudy" | "rainy";
  temperature: number;
  rainChance: number;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

export function ForecastCard({
  day,
  condition,
  temperature,
  rainChance,
}: ForecastCardProps) {
  const Icon = weatherIcons[condition];

  return (
    <Card className="glass-effect p-4 hover:shadow-xl transition-shadow">
      <div className="text-sm text-muted-foreground">{day}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="weather-icon">
          <Icon className="w-12 h-12 text-primary" />
        </div>
        <div className="text-2xl font-semibold">{temperature}°C</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Hujan</span>
        <span className="text-sm font-medium">{rainChance}%</span>
      </div>
    </Card>
  );
}