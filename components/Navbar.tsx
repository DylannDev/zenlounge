"use client";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navlinks from "./Navlinks";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <div
      className={`h-[80px] lg:h-[120px] flex items-center justify-between px-5 sm:px-10 lg:px-20 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg ${
        !isHomePage ? "border-b" : ""
      }`}
    >
      <Logo />
      <Navlinks />
      <MobileMenu />
    </div>
  );
};

export default Navbar;
