import Link from "next/link";
import { navbarLinks, socialLinks } from "@/data";
import Logo from "./Logo";
import InfoSection from "./Infosection";
import {
  PiMapPinLight,
  PiPhoneLight,
  PiEnvelopeLight,
  PiClockLight,
} from "react-icons/pi";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/cgv", label: "CGV" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="">
      <InfoSection />
      <div className="bg-brown-background text-white text-sm font-light h-full pt-72 pb-8 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1600px] md:px-10 mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row gap-12 md:gap-2 justify-between border-b border-rose-dark pb-16">
            <div className="flex flex-col items-center md:items-start gap-2 md:max-w-xs">
              <Logo color="rose" size="300" />
              <p className="text-lg">Harmonie, relaxation et bien-être.</p>
              <address className="not-italic mt-4 flex flex-col gap-2 text-base text-center md:text-left">
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <PiMapPinLight className="text-rose-dark text-xl shrink-0" />
                  Matoury
                </span>
                <a
                  href="tel:+594694003935"
                  className="flex items-center gap-2 justify-center md:justify-start hover:text-rose-dark"
                >
                  <PiPhoneLight className="text-rose-dark text-xl shrink-0" />
                  0694 00 39 35
                </a>
                <a
                  href="mailto:contact@zenlounge-guyane.fr"
                  className="flex items-center gap-2 justify-center md:justify-start hover:text-rose-dark"
                >
                  <PiEnvelopeLight className="text-rose-dark text-xl shrink-0" />
                  contact@zenlounge-guyane.com
                </a>
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <PiClockLight className="text-rose-dark text-xl shrink-0" />
                  Lun – Sam, sur réservation
                </span>
              </address>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 hover-underline">
              <h3 className="font-semibold uppercase text-lg text-rose-dark">
                Nos prestations
              </h3>
              <nav className="flex flex-col items-center md:items-start gap-4 hover-underline justify-center text-base font-medium">
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
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 hover-underline">
              <h3 className="font-semibold uppercase text-lg text-rose-dark">
                Informations
              </h3>
              <nav className="flex flex-col items-center md:items-start gap-4 hover-underline justify-center text-base font-medium">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:underline underline-offset-8"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-8 hover-underline">
              <h3 className="font-semibold uppercase text-lg text-rose-dark">
                Suivez-nous
              </h3>
              <div className="flex flex-col items-center md:items-start gap-4 hover-underline justify-center">
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={social.platform}
                      className="hover:scale-105 transition-transform text-white text-3xl"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-8">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-2">
              <div className="">
                © {currentYear}{" "}
                <span className="font-semibold uppercase">Zen Lounge</span>{" "}
              </div>
              <div className="text-base">
                Made by{" "}
                <a
                  href="https://vizionweb.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-rose-dark"
                >
                  Vizion Web
                </a>{" "}
                💫
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
