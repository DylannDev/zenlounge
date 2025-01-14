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
      className={`h-[80px] lg:h-[120px] fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg flex items-center ${
        !isHomePage ? "border-b" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 min-[900px]:px-16 lg:px-20 mx-auto max-w-[1600px] w-full">
        <Logo />
        <Navlinks />
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
