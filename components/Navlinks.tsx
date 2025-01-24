"use client";

import { navbarLinks } from "@/data";
import Link from "next/link";
import Button from "./Button";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/actions/authClient";
import { useRouter } from "next/navigation";

const Navlinks = () => {
  const router = useRouter();
  const user = useAuth();
  console.log(user);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="hidden lg:flex items-center gap-4">
      <nav className="flex gap-4 font-medium text-base">
        {navbarLinks.map((link, index) => (
          <Link
            key={index}
            href={`/${link.href}`}
            className="hover:underline underline-offset-8 transition-all duration-300 ease-in-out"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {user ? (
        <Button
          onClick={handleLogout}
          color="rose"
          icon={<PiSignOutBold />}
          button
        >
          Déconnexion
        </Button>
      ) : (
        <Button color="rose" icon={<PiSignInBold />} href="/login">
          Connexion
        </Button>
      )}
    </div>
  );
};

export default Navlinks;
