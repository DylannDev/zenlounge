"use client";

import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navlinks from "./Navlinks";
import { usePathname } from "next/navigation";
import LoggedInMenu from "./LoggedInMenu";
import Button from "./Button";
import { PiSignInBold } from "react-icons/pi";

const Navbar = () => {
  const pathname = usePathname();
  const user = useAuth();

  const isHomePage = pathname === "/";

  return (
    <div
      className={`h-[80px] lg:h-[120px] fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg flex items-center ${
        !isHomePage ? "border-b" : ""
      }`}
    >
      <div className="relative flex items-center justify-between px-5 min-[900px]:px-16 lg:px-20 mx-auto max-w-[1600px] w-full">
        <Logo />
        <div className="flex items-center gap-2">
          <MobileMenu />
          <div className="flex lg:hidden">
            <LoggedInMenu />
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          <Navlinks />
          <div className="ml-8">
            {user ? (
              <LoggedInMenu />
            ) : (
              <Button
                color="rose"
                icon={<PiSignInBold />}
                href="/login"
                compact
              >
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
