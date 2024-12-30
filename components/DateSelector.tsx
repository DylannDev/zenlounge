import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  return (
    <div className="relative h-full flex flex-col w-full">
      <label className="block text-sm font-medium text-blue-light mb-2">
        Date
      </label>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={{ before: new Date() }}
        locale={fr}
        className="rounded-xl border border-rose-dark h-full max-h-[360px]"
        formatters={{
          formatWeekdayName: (weekday) =>
            weekday
              .toLocaleDateString("fr-FR", { weekday: "short" })
              .replace(".", "")
              .replace(/^\w/, (c) => c.toUpperCase()),
        }}
      />
    </div>
  );
};

export default DateSelector;
