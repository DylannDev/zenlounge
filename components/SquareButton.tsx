import React from "react";

interface SquareButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled: boolean;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  onClick,
  children,
  icon,
  className = "",
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center whitespace-nowrap gap-1 items-center px-3 py-2 text-sm font-semibold bg-rose-background border border-rose-dark text-brown-dark hover:bg-rose-light rounded-lg w-full sm:w-fit ${className} ${disabled ? "cursor-not-allowed opacity-75" : ""}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default SquareButton;
