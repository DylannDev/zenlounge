"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/actions/authClient";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import { PiUserBold, PiUserCircle } from "react-icons/pi";
import { loggedInLinks } from "@/data";
import { useAuth } from "@/hooks/useAuth";

const LoggedInMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleLoggedInMenu = () => {
    user ? setIsOpen(!isOpen) : router.push("/login");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="hidden lg:flex">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          color="rose"
          icon={<PiUserBold className="text-xl" />}
          button
          compact
        >
          Mon compte
        </Button>
      </div>
      <div
        className="flex lg:hidden text-brown-background hover:bg-rose-light cursor-pointer p-1 rounded-md text-3xl focus:outline-none"
        onClick={handleLoggedInMenu}
      >
        <PiUserCircle />
      </div>

      {/* Menu déroulant */}

      <div
        className={`absolute top-[58.5px] sm:top-[63px] lg:top-[84.5px] bg-white shadow-md rounded-bl-xl rounded-br-xl sm:rounded-br-none xl:rounded-br-xl overflow-hidden w-full sm:w-[350px] transition-all duration-500 ease-in-out transform ${isOpen ? "translate-x-0 right-0" : "translate-x-full right-[-500px]"} ${!isHomePage ? "border" : ""}`}
      >
        <ul className="flex flex-col p-2">
          {loggedInLinks.map((item, index) =>
            index === loggedInLinks.length - 1 ? (
              <React.Fragment key={index}>
                <hr className="border-gray-300 my-2" />
                <li onClick={() => setIsOpen(!isOpen)}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-3 text-blue-light hover:bg-rose-background rounded-lg w-full text-left"
                  >
                    <span className="text-2xl text-rose-dark">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <li key={index} onClick={() => setIsOpen(!isOpen)}>
                <Link
                  href={item.href as string}
                  className="flex items-center gap-2 px-2 py-3 text-blue-light hover:bg-rose-background rounded-lg w-full text-left"
                >
                  <span className="text-2xl text-rose-dark">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default LoggedInMenu;
