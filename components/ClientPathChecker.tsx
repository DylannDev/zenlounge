"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ClientPathCheckerProps {
  children: ReactNode;
}

const ClientPathChecker = ({ children }: ClientPathCheckerProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      className={`h-[80px] lg:h-[120px] fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg flex items-center ${
        !isHomePage ? "border-b" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ClientPathChecker;
