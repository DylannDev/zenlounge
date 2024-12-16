import React from "react";
import {
  PiCalendarCheckLight,
  PiCheckCircleLight,
  PiFlowerLotusLight,
} from "react-icons/pi";

const ProcessSection = () => {
  const steps = [
    {
      icon: <PiCheckCircleLight />,
      title: "Choisissez une prestation",
      description:
        "Découvrez nos prestations variées et choisissez celle qui répond le mieux à vos envies.",
    },
    {
      icon: <PiCalendarCheckLight />,
      title: "Réservez un créneau",
      description:
        "Réservez votre prestation et sélectionnez un créneau qui correspond à votre emploi du temps.",
    },
    {
      icon: <PiFlowerLotusLight />,
      title: "Profitez de votre moment",
      description:
        "Vivez une expérience de bien-être unique grâce à un service personnalisé et attentif.",
    },
  ];

  return (
    <section className="py-20">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl sm:text-4xl font-medium mb-16">
          Laissez-vous guider, étape par étape.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-6 bg-brown-dark rounded-full text-[44px] text-rose-dark ring-brown-dark ring-1 ring-offset-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-medium">{step.title}</h3>
              <p className="text-blue-light text-base font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
