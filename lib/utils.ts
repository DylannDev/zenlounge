import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// console.log(timeToMinutes("09:30")); // 570

export const formatSlot = (slot: number): string => {
  const hours = Math.floor(slot / 60);
  const minutes = slot % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

// console.log(formatSlot(570)); // "09:30"

export const formatDate = (input: Date | string): string => {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Paris",
  };

  // Si l'entrée est une chaîne, la convertir en Date
  const date = typeof input === "string" ? new Date(input) : input;

  // Formatage
  return date.toLocaleDateString("fr-FR", options);
};
