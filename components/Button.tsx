"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

type ColorOption = "white" | "rose" | "empty";
type WidthOption = "large" | "normal";

type ResponsiveWidth = {
  default: WidthOption;
  sm?: WidthOption;
  md?: WidthOption;
  lg?: WidthOption;
};

type ButtonProps = {
  children: string | React.ReactNode;
  icon?: ReactNode;
  href?: string;
  color?: ColorOption;
  responsiveWidth?: ResponsiveWidth;
  compact?: boolean;
  disabled?: boolean;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | undefined;
};

const Button = ({
  children,
  icon,
  href,
  color = "rose",
  responsiveWidth = { default: "large" },
  compact = false,
  disabled = false,
  button = false,
  onClick,
  type,
}: ButtonProps) => {
  const baseClasses =
    "rounded-full px-8 font-bold text-center text-base transition-all duration-200 ease-in-out active:scale-95 flex justify-center items-center gap-2";

  // Gérer les classes de largeur responsive avec des valeurs fixes
  const responsiveClasses = `
    ${responsiveWidth.default === "large" ? "w-full" : "w-fit"}
    ${responsiveWidth.sm === "large" ? "sm:w-full" : responsiveWidth.sm === "normal" ? "sm:w-fit" : ""}
    ${responsiveWidth.md === "large" ? "md:w-full" : responsiveWidth.md === "normal" ? "md:w-fit" : ""}
    ${responsiveWidth.lg === "large" ? "lg:w-full" : responsiveWidth.lg === "normal" ? "lg:w-fit" : ""}
  `;

  const heightClass = compact ? "py-3" : "py-4"; // Hauteur basée sur `compact`

  const colorClasses = {
    white: "bg-white text-brown-dark hover:bg-rose-light",
    rose: "bg-rose-background border border-rose-dark text-brown-dark hover:bg-rose-light",
    empty:
      "bg-white border border-rose-dark text-brown-dark hover:bg-rose-light",
  };

  const classes = `${baseClasses} ${responsiveClasses} ${heightClass} ${
    colorClasses[color]
  } ${disabled ? "cursor-not-allowed opacity-75" : ""}`;

  const content = (
    <>
      {icon && <span className="">{icon}</span>}
      {children || (icon ? null : "")}
    </>
  );

  return button ? (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  ) : (
    <Link href={href || ""} className={classes}>
      {content}
    </Link>
  );
};

export default Button;
