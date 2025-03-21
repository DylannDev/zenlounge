import React from "react";
import { PiPhoneLight, PiMapPinLight, PiClockLight } from "react-icons/pi";

const InfoSection = () => {
  const info = [
    {
      icon: <PiPhoneLight />,
      title: "Contactez-nous",
      description:
        "Téléphone : 06 94 00 39 35\nEmail : contact@zenlounge-guyane.com",
    },
    {
      icon: <PiMapPinLight />,
      title: "Adresse",
      description:
        "87, Les Hauts de la Chaumière\n97351 MATOURY, Guyane Française",
    },
    {
      icon: <PiClockLight />,
      title: "Horaires",
      description: "Lundi - Samedi : 9h à 12h - 14h à 19h\nDimanche : Fermé",
    },
  ];

  return (
    <section className="max-w-[1600px] px-4 lg:px-10 mx-auto -mb-[202px] relative w-full">
      <div className="py-20 bg-rose-background border border-rose-dark rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 px-4 md:px-8">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-6 bg-rose-dark rounded-full text-[44px] text-brown-dark ring-brown-dark ring-1 ring-offset-4 mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="text-blue-light text-base whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
