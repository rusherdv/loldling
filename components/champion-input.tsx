"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";

interface ChampionInputProps {
  champions: any[];
  onGuess: (championId: string) => void;
  disabled?: boolean;
}

export default function ChampionInput({
  champions,
  onGuess,
  disabled = false,
}: ChampionInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredChampions, setFilteredChampions] = useState<any[]>([]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredChampions([]);
    } else {
      const filtered = champions
        .filter((champion) =>
          champion.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 50);
      setFilteredChampions(filtered);
    }
  }, [inputValue, champions]);

  const handleSelect = (championId: string) => {
    const champion = champions.find((c) => c.id === championId);
    if (champion) {
      setOpen(false);
      onGuess(championId);
      setInputValue("");
      setFilteredChampions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const champion = champions.find(
      (c) => c.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (champion) {
      handleSelect(champion.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-fit ">
      <div className="relative w-fit flex items-center justify-center mx-auto">
        <Input
          ref={inputRef}
          placeholder="Escribe el nombre del campeón"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={() => setOpen(true)}
          className="bg-gray-800 border-yellow-500/50 focus:border-yellow-500 h-14 px-2 text-lg shadow-lg"
          disabled={disabled}
        />
      </div>

      {/* Champion suggestions */}
      {filteredChampions.length > 0 && open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            {filteredChampions.map((champion) => (
              <div
                key={champion.id}
                onClick={() => handleSelect(champion.id)}
                className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors duration-150"
              >
                <div className="w-10 h-10 mr-3 overflow-hidden rounded-md border border-gray-600">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champion.id}.png`}
                    alt={champion.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white">{champion.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </form>
  );
}
