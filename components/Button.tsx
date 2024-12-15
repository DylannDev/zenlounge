"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

type ColorOption = "white" | "black" | "rose" | "brown";
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
  color = "black",
  width = "large",
  disabled = false,
  button = false,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "rounded-full px-8 py-4 font-bold text-center whitespace-nowrap text-base";
  const widthClass = width === "large" ? "w-full" : "w-fit";
  const colorClasses = {
    white: "bg-white text-brown-dark hover:bg-gray-100 active:bg-gray-200",
    black: "bg-black hover:bg-black/90 active:bg-black/70 text-white",
    rose: "bg-rose-light text-brown hover:bg-rose active:bg-rose-dark",
    brown: "bg-brown text-white hover:bg-brown-light active:bg-brown-dark",
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
