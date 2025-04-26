"use client";

import { motion } from "framer-motion";
import { MoveUp, MoveDown } from "lucide-react";

export default function ColorIndicators() {
  const indicators = [
    {
      color: "bg-green-500",
      label: "Correcto",
      description: "El atributo coincide exactamente",
    },
    {
      color: "bg-orange-500",
      label: "Parcial",
      description: "Coincidencia parcial del atributo",
    },
    {
      color: "bg-red-500",
      label: "Incorrecto",
      description: "El atributo no coincide",
    },
    {
      color: "bg-red-500",
      label: "Más alto",
      description: "El valor del campeón objetivo es mayor",
      icon: <MoveUp className="w-5 h-5" />,
    },
    {
      color: "bg-red-500",
      label: "Más bajo",
      description: "El valor del campeón objetivo es menor",
      icon: <MoveDown className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700"
        >
          <div
            className={`w-10 h-10 ${indicator.color} flex items-center justify-center rounded-md mr-3 relative flex-shrink-0`}
          >
            {indicator.icon && indicator.icon}
          </div>
          <div>
            <span className="font-bold text-white">{indicator.label}</span>
            <p className="text-xs text-gray-400">{indicator.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
