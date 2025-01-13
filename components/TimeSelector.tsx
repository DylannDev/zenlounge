import { formatSlot, timeToMinutes } from "@/lib/utils";
import React, { useMemo } from "react";

interface TimeSelectorProps {
  selectedDate: Date | undefined;
  serviceDuration: number;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  bookings: { date: Date; time: string; duration: number }[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedDate,
  serviceDuration,
  selectedTime,
  onSelectTime,
  bookings,
}) => {
  // Tous les créneaux horaires disponibles (minutes calculées depuis 00:00)
  const allSlots = [
    540, // 09:00
    570, // 09:30
    600, // 10:00
    630, // 10:30
    660, // 11:00
    690, // 11:30
    840, // 14:00
    870, // 14:30
    900, // 15:00
    930, // 15:30
    960, // 16:00
    990, // 16:30
    1020, // 17:00
    1050, // 17:30
    1080, // 18:00
    1110, // 18:30
  ];

  const morningClosingTime = 720; // 12:00 en minutes
  const afternoonOpeningTime = 840; // 14:00 en minutes
  const eveningClosingTime = 1140; // 19:00 en minutes

  // Fonction pour obtenir les créneaux disponibles
  const getAvailableSlots = (): number[] => {
    if (!selectedDate) return [];

    // Filtrer les réservations pour le jour sélectionné
    const dayBookings = bookings.filter(
      (booking) =>
        booking.date.toLocaleDateString("fr-FR") ===
        selectedDate.toLocaleDateString("fr-FR")
    );

    const unavailableSlots = new Set<number>();

    dayBookings.forEach((booking) => {
      const startTime = timeToMinutes(booking.time); // Heure de début en minutes
      const endTime = startTime + booking.duration; // Heure de fin en minutes
      for (let i = startTime; i < endTime; i += 30) {
        unavailableSlots.add(i);
      }
    });

    return allSlots.filter((slot) => {
      const slotEnd = slot + serviceDuration;

      // Vérifier si le créneau dépasse les heures de travail
      if (
        (slot < morningClosingTime && slotEnd > morningClosingTime) || // Chevauche la fermeture du midi
        (slot >= morningClosingTime && slot < afternoonOpeningTime) || // Pendant la pause du midi
        slotEnd > eveningClosingTime // Dépasse la fermeture du soir
      ) {
        return false;
      }

      // Vérifier s'il chevauche une réservation existante
      const hasOverlap = dayBookings.some((booking) => {
        const bookingStart = timeToMinutes(booking.time);
        const bookingEnd = bookingStart + booking.duration;

        // Vérifiez si la plage sélectionnée chevauche une réservation existante
        return (
          (slot >= bookingStart && slot < bookingEnd) || // Le créneau commence dans une réservation
          (slotEnd > bookingStart && slotEnd <= bookingEnd) || // Le créneau se termine dans une réservation
          (slot < bookingStart && slotEnd > bookingEnd) // Le créneau englobe une réservation
        );
      });

      return !hasOverlap;
    });
  };

  // Mémoisation pour éviter un recalcul inutile
  const availableSlots = useMemo(
    () => getAvailableSlots(),
    [selectedDate, bookings, serviceDuration]
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-blue-light mb-2">
        Heure
      </label>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {availableSlots.map((slot) => {
          const formattedSlot = formatSlot(slot);
          return (
            <li key={slot}>
              <button
                onClick={() => onSelectTime(formattedSlot)}
                className={`w-full px-4 py-2 rounded-md border text-center ${
                  selectedTime === formattedSlot
                    ? "border-orange bg-orange/10 text-orange"
                    : "border-blue-light/20 bg-white text-blue-light"
                } hover:bg-rose-background hover:border-orange/50 focus:outline-none`}
              >
                {formattedSlot}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimeSelector;
