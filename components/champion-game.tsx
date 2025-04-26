"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Settings, HelpCircle, BarChart3, Flame, FileText } from "lucide-react";
import ChampionInput from "./champion-input";
import ChampionAttributes from "./champion-attributes";
import ColorIndicators from "./color-indicators";
import { fetchAllChampions, fetchChampionDetails } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { getRandomChampion } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ChampionGame() {
  const [allChampions, setAllChampions] = useState<any[]>([]);
  const [targetChampion, setTargetChampion] = useState<any>(null);
  const [guesses, setGuesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [guessCount, setGuessCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const initGame = async () => {
      try {
        setLoading(true);
        const champions = await fetchAllChampions();
        setAllChampions(champions);

        const randomChamp = getRandomChampion(champions);
        const champDetails = await fetchChampionDetails(randomChamp.id);
        setTargetChampion(champDetails);
        console.log(champDetails);

        setLoading(false);
      } catch (error) {
        console.error("Error initializing game:", error);
        setLoading(false);
      }
    };

    initGame();
  }, []);

  const handleGuess = async (championId: string) => {
    if (gameWon) return;

    try {
      const champion = allChampions.find((c) => c.id === championId);
      if (!champion) return;

      const champDetails = await fetchChampionDetails(champion.id);

      const newGuess = {
        ...champDetails,
        correct: champion.id === targetChampion.id,
        comparison: {
          gender: champDetails.gender === targetChampion.gender,
          positions: comparePositions(
            champDetails.positions,
            targetChampion.positions
          ),
          species: compareSpecies(champDetails.species, targetChampion.species),
          resource: champDetails.resource === targetChampion.resource,
          rangeType: compareRangeType(
            champDetails.rangeType,
            targetChampion.rangeType
          ),
          regions: compareRegions(champDetails.regions, targetChampion.regions),
          releaseYear: {
            match: champDetails.releaseYear === targetChampion.releaseYear,
            higher: champDetails.releaseYear > targetChampion.releaseYear,
            lower: champDetails.releaseYear < targetChampion.releaseYear,
          },
        },
      };

      setGuesses((prev) => [newGuess, ...prev]);
      setGuessCount((prev) => prev + 1);

      if (champion.id === targetChampion.id) {
        setGameWon(true);
      }
    } catch (error) {
      console.error("Error processing guess:", error);
    }
  };

  const comparePositions = (guessPos: string[], targetPos: string[]) => {
    if (guessPos.some((pos) => targetPos.includes(pos))) {
      return guessPos.every((pos) => targetPos.includes(pos)) &&
        targetPos.every((pos) => guessPos.includes(pos))
        ? "correct"
        : "partial";
    }
    return "incorrect";
  };

  const compareSpecies = (guessSpecies: string, targetSpecies: string) => {
    return guessSpecies === targetSpecies ? "correct" : "incorrect";
  };

  const compareRangeType = (guessType: string, targetType: string) => {
    return guessType === targetType ? "correct" : "incorrect";
  };

  const compareRegions = (guessRegions: string[], targetRegions: string[]) => {
    if (guessRegions.some((region) => targetRegions.includes(region))) {
      return guessRegions.every((region) => targetRegions.includes(region)) &&
        targetRegions.every((region) => guessRegions.includes(region))
        ? "correct"
        : "partial";
    }
    return "incorrect";
  };

  const resetGame = async () => {
    try {
      setLoading(true);
      setGuesses([]);
      setGuessCount(0);
      setGameWon(false);

      const randomChamp = getRandomChampion(allChampions);
      const champDetails = await fetchChampionDetails(randomChamp.id);
      setTargetChampion(champDetails);

      setLoading(false);
    } catch (error) {
      console.error("Error resetting game:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
        <p className="mt-4 text-lg text-yellow-500">Cargando campeones...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 bg-[url('/bg-pattern.png')] bg-repeat bg-opacity-20 text-white">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 font-game drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
            LoLdling
          </h1>
        </div>

        {/* Game Title */}
        <div className="bg-gray-800/80 mt-4 rounded-lg p-6 mb-6 text-center border border-yellow-500/30 shadow-lg shadow-black/20">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-100">
            {gameWon
              ? "¡Felicidades! Has adivinado el campeón"
              : "¡Adiviná el campeón de League of Legends de hoy!"}
          </h2>
        </div>

        {/* Champion Input */}
        <ChampionInput
          champions={allChampions}
          onGuess={handleGuess}
          disabled={gameWon}
        />

        <div className="grid grid-cols-8 gap-1 text-center text-sm overflow-hidden mt-4 shadow-lg">
          <p className="border-b pb-2 border-white">Campeon</p>
          <p className="border-b pb-2 border-white">Genero</p>
          <p className="border-b pb-2 border-white">Posicion</p>
          <p className="border-b pb-2 border-white">Especie</p>
          <p className="border-b pb-2 border-white">Energia</p>
          <p className="border-b pb-2 border-white">Rango</p>
          <p className="border-b pb-2 border-white">Region</p>
          <p className="border-b pb-2 border-white">Año</p>
        </div>

        {/* Guesses */}
        <div className="space-y-4 mt-2">
          {guesses.map((guess, index) => (
            <motion.div
              key={`${guess.id}-${index}`}
              layout // <- Esto hace la magia
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChampionAttributes
                champion={guess}
                comparison={guess.comparison}
              />
            </motion.div>
          ))}
        </div>

        {/* Guess Counter */}
        {(gameWon || guesses.length > 0) && (
          <p className="text-center my-4 text-sm text-gray-300">
            {gameWon
              ? `¡Lo adivinaste en ${guessCount} ${
                  guessCount === 1 ? "intento" : "intentos"
                }!`
              : `${guesses.length} ${
                  guesses.length === 1 ? "intento" : "intentos"
                } realizados`}
          </p>
        )}

        {/* Game Actions */}
        {gameWon && (
          <div className="flex justify-center mb-6">
            <Button
              onClick={resetGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Juga de nuevo gordo si te da
            </Button>
          </div>
        )}

        {/* Color Indicators - Now always visible below search */}
        <div className="mt-6 mb-4 bg-gray-800/80 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold mb-3 text-center text-yellow-100">
            Indicadores de color
          </h3>
          <ColorIndicators />
        </div>
      </div>
    </div>
  );
}
