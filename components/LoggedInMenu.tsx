import { logout } from "@/actions/authClient";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { PiUserBold } from "react-icons/pi";
import React, { useState } from "react";
import { loggedInLinks } from "@/data";
import Link from "next/link";

const LoggedInMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        color="rose"
        icon={<PiUserBold className="text-xl" />}
        button
        compact
      >
        Mon compte
      </Button>

      {/* Menu déroulant */}

      <div className="relative z-10">
        <div
          className={`absolute top-[50px] bg-white border shadow-lg rounded-xl overflow-hidden min-w-[350px] transition-all duration-300 ease-in-out transform ${isOpen ? "translate-x-0 right-0" : "-translate-x-full right-[-1000px]"}`}
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
                      <span className="text-2xl text-rose-dark">
                        {item.icon}
                      </span>
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
      </div>
    </>
  );
};

export default LoggedInMenu;
