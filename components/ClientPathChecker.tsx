"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ClientPathCheckerProps {
  children: ReactNode;
}

const ClientPathChecker = ({ children }: ClientPathCheckerProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsVisible(false); // Cache la navbar quand on descend
      } else {
        setIsVisible(true); // Affiche la navbar quand on monte
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`h-[80px] lg:h-[120px] fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg flex items-center transition-transform duration-300 ${
        !isHomePage ? "border-b" : ""
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {children}
    </div>
  );
};

export default ClientPathChecker;
