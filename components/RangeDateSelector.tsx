import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { isBefore, isSameDay, isWithinInterval, addDays } from "date-fns";

interface DateSelectorProps {
  selectedDate?: DateRange;
  onSelectDate?: SelectRangeEventHandler | undefined;
  bookedDates: { from: Date; to: Date }[];
}

const RangeDateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
  bookedDates,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 📌 Fonction pour désactiver les dates réservées
  const isDateDisabled = (date: Date) => {
    date.setHours(0, 0, 0, 0);

    // ❌ Désactiver aujourd'hui et les dates passées
    if (isBefore(date, today)) return "past";

    // ❌ Désactiver toutes les dates dans un range réservé
    for (const { from, to } of bookedDates) {
      if (isWithinInterval(date, { start: from, end: to })) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="relative h-full flex flex-col w-full shadow-lg rounded-xl">
      <Calendar
        mode="range"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={(date) => isDateDisabled(date) === true}
        locale={fr}
        className="rounded-xl border border-rose-dark h-full max-h-[360px]"
        formatters={{
          formatWeekdayName: (weekday) =>
            weekday
              .toLocaleDateString("fr-FR", { weekday: "short" })
              .replace(".", "")
              .replace(/^\w/, (c) => c.toUpperCase()),
        }}
        modifiers={{ past: (date) => isDateDisabled(date) === "past" }} // Appliquer le style `day_past` aux jours passés
        modifiersClassNames={{
          past: "day-past", // Ajout d'une classe pour les jours passés
        }}
      />
    </div>
  );
};

export default RangeDateSelector;
