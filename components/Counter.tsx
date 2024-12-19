import React from "react";
import {
  PiMinus,
  PiMinusLight,
  PiPlus,
  PiPlusCircle,
  PiPlusLight,
} from "react-icons/pi";

interface CounterProps {
  value: number; // Valeur actuelle du compteur
  onIncrement: () => void; // Fonction appelée pour incrémenter
  onDecrement: () => void; // Fonction appelée pour décrémenter
  minValue?: number; // Valeur minimale (par défaut 0)
}

const Counter: React.FC<CounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  minValue = 0,
}) => {
  return (
    <div className="flex items-center gap-2 border border-rose-dark rounded-lg max-w-[112px]">
      <button
        className="p-2 h-full cursor-pointer"
        onClick={onDecrement}
        disabled={value <= minValue} // Désactiver si la valeur atteint minValue
      >
        <PiMinus />
      </button>
      <span className="p-2 text-sm min-w-[30px]">{value}</span>
      <button className="p-2 cursor-pointer" onClick={onIncrement}>
        <PiPlus />
      </button>
    </div>
  );
};

export default Counter;
