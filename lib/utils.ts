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

export const convertFirebaseTimestamp = (timestamp?: {
  seconds: number;
  nanoseconds: number;
}): Date => {
  return timestamp ? new Date(timestamp.seconds * 1000) : new Date(); // ✅ Retourne toujours une `Date`
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

export function isDateExpired(expirationDate: string | Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialisation à minuit

  const expiresAt = new Date(expirationDate);
  expiresAt.setHours(0, 0, 0, 0); // Réinitialisation à minuit

  return expiresAt < today;
}

export function canCancelBooking(serviceDate: string | Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const serviceDateObj = new Date(serviceDate);
  serviceDateObj.setHours(0, 0, 0, 0);

  return (
    serviceDateObj.getTime() === tomorrow.getTime() ||
    serviceDateObj.getTime() === today.getTime() ||
    serviceDateObj.getTime() < today.getTime()
  );
}

export function filterBookings(bookings: any[]) {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normaliser à minuit

  const rentBookings = bookings.filter(
    (booking) => booking.type === "rentBooking"
  );
  const standardBookings = bookings.filter(
    (booking) => booking.type !== "rentBooking"
  );

  // 🔹 Filtrage des prestations classiques (hors location)
  const upcomingBookings = standardBookings
    .filter((s) => {
      const bookingDate = new Date(s.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= now; // Inclut aujourd'hui et les futures réservations
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Tri de la plus proche à la plus lointaine

  const pastBookings = standardBookings
    .filter((s) => {
      const bookingDate = new Date(s.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate < now; // Seulement les dates passées
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Tri de la plus récente à la plus ancienne

  // 🔹 Filtrage des réservations de location
  const upcomingRentBookings = rentBookings
    .filter((booking) => {
      const bookingEndDate = new Date(booking.dateTo);
      bookingEndDate.setHours(0, 0, 0, 0);
      return bookingEndDate >= now; // Inclut aujourd'hui et les futures locations
    })
    .sort(
      (a, b) => new Date(a.dateTo).getTime() - new Date(b.dateTo).getTime()
    ); // Tri de la plus proche à la plus lointaine

  const pastRentBookings = rentBookings
    .filter((booking) => {
      const bookingEndDate = new Date(booking.dateTo);
      bookingEndDate.setHours(0, 0, 0, 0);
      return bookingEndDate < now; // Seulement les locations passées
    })
    .sort(
      (a, b) => new Date(b.dateTo).getTime() - new Date(a.dateTo).getTime()
    ); // Tri de la plus récente à la plus ancienne

  return {
    upcomingBookings,
    pastBookings,
    upcomingRentBookings,
    pastRentBookings,
  };
}
