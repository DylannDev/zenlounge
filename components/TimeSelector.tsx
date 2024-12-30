import React from "react";

interface TimeSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onSelectTime,
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 19; hour++) {
      if (hour === 12 || hour === 13) continue;
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-blue-light mb-2">
        Heure
      </label>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {timeSlots.map((time) => (
          <li key={time}>
            <button
              onClick={() => onSelectTime(time)}
              className={`w-full px-4 py-2 rounded-md border text-center ${
                selectedTime === time
                  ? "border-orange bg-orange/10 text-orange"
                  : "border-blue-light/20 bg-white text-blue-light"
              } hover:bg-rose-background hover:border-orange/50 focus:outline-none`}
            >
              {time}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSelector;
