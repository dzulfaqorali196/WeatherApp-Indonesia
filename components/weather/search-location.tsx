"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchLocationProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchLocation({ value, onChange, onSearch }: SearchLocationProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Cari kota..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-effect pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button className="glass-effect" onClick={onSearch}>
        Cari
      </Button>
    </div>
  );
}