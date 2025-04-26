"use client";

import { cn } from "@/lib/utils";
import { MoveUp, MoveDown } from "lucide-react";
import { motion } from "framer-motion";

interface ChampionAttributesProps {
  champion: any;
  comparison: any;
}

export default function ChampionAttributes({
  champion,
  comparison,
}: ChampionAttributesProps) {
  const getColorClass = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-green-500 border-green-600";
      case "partial":
        return "bg-orange-500 border-orange-600";
      case "incorrect":
        return "bg-red-500 border-red-600";
      default:
        return "bg-gray-700 border-gray-600";
    }
  };

  const getYearColorClass = () => {
    if (comparison.releaseYear.match) return "bg-green-500 border-green-600";
    if (comparison.releaseYear.higher)
      return "bg-red-500 border-red-600 relative";
    if (comparison.releaseYear.lower)
      return "bg-red-500 border-red-600 relative";
    return "bg-gray-700 border-gray-600";
  };

  const getYearIndicator = () => {
    if (comparison.releaseYear.match) return null;
    if (comparison.releaseYear.higher) {
      return <MoveDown className="w-5" />;
    }
    if (comparison.releaseYear.lower) {
      return <MoveUp className="w-5" />;
    }
    return null;
  };

  return (
    <div
      key={champion.id}
      className="grid grid-cols-8 gap-1 text-center text-sm overflow-hidden shadow-lg"
    >
      {/* Champion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 * 0.1 }}
        className="bg-gray-800 aspect-square rounded-sm p-3 flex items-center justify-center border border-gray-700"
      >
        <div className="w-18 h-18 overflow-hidden rounded-md border-2 border-yellow-500/50">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champion.id}.png`}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Gender */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.gender ? "correct" : "incorrect")
        )}
      >
        <span className="font-medium">{formatGender(champion.gender)}</span>
      </motion.div>

      {/* Positions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.positions)
        )}
      >
        <span className="font-medium">{champion.positions.join(", ")}</span>
      </motion.div>

      {/* Species */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.species)
        )}
      >
        <span className="font-medium">{champion.species}</span>
      </motion.div>

      {/* Resource */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.resource ? "correct" : "incorrect")
        )}
      >
        <span className="font-medium">{champion.resource}</span>
      </motion.div>

      {/* Range Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.rangeType)
        )}
      >
        <span className="font-medium">{champion.rangeType}</span>
      </motion.div>

      {/* Regions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border",
          getColorClass(comparison.regions)
        )}
      >
        <span className="font-medium">{champion.regions.join(", ")}</span>
      </motion.div>

      {/* Release Year */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 7 * 0.1 }}
        className={cn(
          "p-3 aspect-square rounded-sm flex items-center justify-center border relative",
          getYearColorClass()
        )}
      >
        <span className="font-medium">{champion.releaseYear}</span>
        {getYearIndicator()}
      </motion.div>
    </div>
  );
}

function formatGender(gender: string) {
  switch (gender) {
    case "male":
      return "Masculino";
    case "female":
      return "Femenino";
    case "divers":
      return "Diverso";
    default:
      return gender;
  }
}
