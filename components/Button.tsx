"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

type ColorOption = "white" | "rose" | "empty" | "brown";
type WidthOption = "large" | "normal";

type ButtonProps = {
  children?: string;
  icon?: ReactNode;
  href?: string;
  color?: ColorOption;
  width?: WidthOption;
  disabled?: boolean;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  icon,
  href,
  color = "rose",
  width = "large",
  disabled = false,
  button = false,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "rounded-full px-8 py-4 font-bold text-center text-base transition-all duration-200 ease-in-out active:scale-95";
  const widthClass = width === "large" ? "w-full" : "w-fit";
  const colorClasses = {
    white: "bg-white text-brown-dark hover:bg-rose-light",
    rose: "bg-rose-background border border-rose-dark text-brown-dark hover:bg-rose-light",
    empty:
      "bg-white border border-rose-dark text-brown-dark hover:bg-rose-light",
    brown: "bg-brown text-white hover:bg-brown-light",
  };

  const classes = `${baseClasses} ${widthClass} ${colorClasses[color]} ${
    disabled ? "cursor-not-allowed opacity-75" : ""
  }`;

  const content = (
    <>
      {icon && <span className="">{icon}</span>}
      {children || (icon ? null : "")}
    </>
  );

  return button ? (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link href={href || ""} className={classes}>
      {content}
    </Link>
  );
};

export default Button;
