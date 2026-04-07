"use client";

import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  // Fonction pour gérer le scroll smooth
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById("nosprestations");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="pb-10">
      <div className="relative w-full aspect-1/2 min-[500px]:aspect-2/3 sm:aspect-3/4 md:aspect-4/3 lg:aspect-video max-h-[calc(100dvh-100px)] lg:max-h-[calc(100dvh-160px)] overflow-hidden">
        <Image
          src={"/massage-1.jpg"}
          alt="Massage relaxant à l'institut de bien-être Zen Lounge à Matoury (Cayenne, Guyane)"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-bottom md:object-center brightness-95 rounded-3xl"
          priority
        />

        <div className="absolute bottom-0 w-full">
          <div className="flex flex-col justify-start gap-2 p-4 sm:p-6 xl:p-12 w-full lg:w-2/3 xl:w-1/2 text-brown-dark">
            <h1 className="font-bold text-3xl sm:text-5xl text-center sm:text-left">
              <span className="hidden sm:inline">
                Institut de bien-être à Matoury, Massages &amp; soins
              </span>
              <span className="inline sm:hidden">
                Institut de bien-être à Matoury
              </span>
            </h1>
            <p className="font-medium text-sm sm:text-lg text-center sm:text-left">
              Salon de massages, soins du corps et du visage en Guyane.
            </p>

            <Button
              color="white"
              responsiveWidth={{ default: "large", md: "normal" }}
              onClick={handleScroll} // ✅ Déclenchement du scroll smooth
              button
            >
              Découvrir les prestations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
