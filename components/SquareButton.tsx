import React from "react";

interface SquareButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "default" | "destructive" | "white"; // ✅ Ajout des variantes
}

const SquareButton: React.FC<SquareButtonProps> = ({
  onClick,
  children,
  icon,
  className = "",
  type = "button",
  disabled,
  variant = "default", // ✅ Valeur par défaut
}) => {
  // ✅ Styles conditionnels selon la variante
  const variantClasses = {
    default:
      "bg-rose-background border-rose-dark text-brown-dark hover:bg-rose-light",
    destructive:
      "bg-rose-dark border-rose-dark text-brown-dark hover:bg-rose-dark/90",
    white: "bg-white border-rose-dark text-brown-dark hover:bg-rose-background",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center whitespace-nowrap gap-1 items-center px-3 py-2 text-sm font-semibold border rounded-lg w-full sm:w-fit
        ${variantClasses[variant]} ${className} ${disabled ? "cursor-not-allowed opacity-75" : ""}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default SquareButton;
