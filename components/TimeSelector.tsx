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
  const serviceInterval = 30; // Pause obligatoire entre prestations

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
      const startTime = timeToMinutes(booking.time);
      const endTime = startTime + booking.duration;

      // Ajouter la prestation à la liste des créneaux bloqués
      for (let i = startTime; i < endTime; i += 30) {
        unavailableSlots.add(i);
      }

      // Ajouter l'intervalle de 30 minutes après la prestation **sauf si après fermeture**
      if (endTime < morningClosingTime || endTime < eveningClosingTime) {
        unavailableSlots.add(endTime);
      }
    });

    return allSlots.filter((slot) => {
      const slotEnd = slot + serviceDuration;
      const slotEndWithInterval = slotEnd + serviceInterval;

      // Vérifier si le créneau dépasse les heures de travail
      if (
        (slot < morningClosingTime && slotEnd > morningClosingTime) || // Chevauche la fermeture du midi
        (slot >= morningClosingTime && slot < afternoonOpeningTime) || // Pendant la pause du midi
        slotEnd > eveningClosingTime // Dépasse la fermeture du soir
      ) {
        return false;
      }

      // Vérifier si un créneau est bloqué par une réservation ou par une pause
      if (unavailableSlots.has(slot)) {
        return false;
      }

      // Vérifier que la prestation sélectionnée + 30 minutes d'intervalle ne chevauche pas un rendez-vous existant
      const hasOverlap = dayBookings.some((booking) => {
        const bookingStart = timeToMinutes(booking.time);
        const bookingEnd = bookingStart + booking.duration;

        return (
          (slot >= bookingStart && slot < bookingEnd + serviceInterval) || // Commence dans une réservation
          (slotEndWithInterval > bookingStart &&
            slotEndWithInterval <= bookingEnd + serviceInterval) || // Se termine dans une réservation
          (slot < bookingStart && slotEndWithInterval > bookingEnd) // Englobe une réservation
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
