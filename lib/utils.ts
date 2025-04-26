import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomChampion(champions: any[]) {
  const randomIndex = Math.floor(Math.random() * champions.length)
  return champions[randomIndex]
}
