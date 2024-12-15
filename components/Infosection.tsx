import React from "react";
import { PiPhoneLight, PiMapPinLight, PiClockLight } from "react-icons/pi";

const InfoSection = () => {
  const info = [
    {
      icon: <PiPhoneLight />,
      title: "Contactez-nous",
      description: "Téléphone : 06 94 34 56 78\nEmail : contact@zenlounge.fr",
    },
    {
      icon: <PiMapPinLight />,
      title: "Adresse",
      description: "123 Avenue de la Sérénité\nLa Chaumière, Guyane Française",
    },
    {
      icon: <PiClockLight />,
      title: "Horaires",
      description:
        "Lundi - Vendredi : 9h - 19h\nSamedi : 10h - 18h\nDimanche : Fermé",
    },
  ];

  return (
    <section className="py-20 bg-rose-light rounded-3xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-6 bg-brown-light rounded-full text-[44px] text-rose-dark ring-brown-light ring-1 ring-offset-4 mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="text-gray-700 text-base whitespace-pre-line">
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
