import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { massageServices, soinsServices, forfaitSeances } from "@/data";

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

export const formatDate = (
  input: Date | string,
  showWeekday: boolean = true
): string => {
  // Options de formatage
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Paris",
  };

  // Ajouter "weekday" seulement si showWeekday est true
  if (showWeekday) {
    options.weekday = "short";
  }

  // Convertir la chaîne en Date si nécessaire
  const date = typeof input === "string" ? new Date(input) : input;

  return date.toLocaleDateString("fr-FR", options);
};

export const convertFirebaseTimestamp = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  if (!timestamp?.seconds) return null;
  return new Date(timestamp.seconds * 1000); // Convertir les secondes en millisecondes
};

// ✅ Fonction pour récupérer l'image correspondant au service
export const getServiceImage = (serviceName: string) => {
  // Vérifier dans les massages
  const foundService =
    massageServices.find((service) => service.name === serviceName) ||
    soinsServices.women.find((service) => service.name === serviceName) ||
    soinsServices.men.find((service) => service.name === serviceName) ||
    forfaitSeances.fiveSessions.find(
      (service) => service.name === serviceName
    ) ||
    forfaitSeances.tenSessions.find((service) => service.name === serviceName);

  return foundService?.imageUrl || "/massage-1.jpg";
};
