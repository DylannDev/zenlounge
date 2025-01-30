"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiX, PiList, PiCaretRightBold } from "react-icons/pi";
import { navbarLinks } from "@/data";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <div className="flex lg:hidden">
      {/* Icone pour ouvrir/fermer le menu */}
      <button
        onClick={toggleMenu}
        className="text-brown-background hover:bg-rose-light cursor-pointer p-1 rounded-md text-3xl focus:outline-none"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? <PiX /> : <PiList />}
      </button>

      {/* Menu mobile */}
      <div
        className={`fixed top-[80px] left-0 right-0 py-10 sm:px-10 px-5 z-40 h-screen bg-white transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="h-full">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className="text-blue-light text-lg hover:text-orange transition flex items-center gap-1 w-fit"
                onClick={toggleMenu}
              >
                Accueil
                <PiCaretRightBold className="text-xs mt-1" />
              </Link>
            </li>
            {navbarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  className="text-blue-light text-lg hover:text-orange transition flex items-center gap-1 w-fit"
                  onClick={toggleMenu}
                >
                  {link.label}
                  <PiCaretRightBold className="text-xs mt-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
