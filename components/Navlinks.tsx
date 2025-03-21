"use client";

import { navbarLinks } from "@/data";
import Link from "next/link";

const Navlinks = () => {
  return (
    <div className="hidden lg:flex items-center justify-between gap-8">
      <nav className="flex gap-1 font-medium text-base">
        {navbarLinks.map((link, index) => (
          <Link
            key={index}
            href={`/${link.href}`}
            className="py-1 px-3 rounded-lg hover:bg-rose-light hover:text-brown-dark underline-offset-8 transition-all duration-300 ease-in-out"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navlinks;
