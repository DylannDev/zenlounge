import { navbarLinks } from "@/data";
import Link from "next/link";

const Navlinks = () => {
  return (
    <nav className="flex gap-4 font-medium text-base">
      {navbarLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="hover:underline underline-offset-8"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
