import Image from "next/image";
import React from "react";
import {
  PiCalendarCheckLight,
  PiCheckCircleLight,
  PiFlowerLotusLight,
} from "react-icons/pi";
import BackgroundIllustration from "./ui/BackgroundIllustration";

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
    <section className="py-10 relative">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="mb-16 flex flex-col items-center gap-1">
          <h2 className="font-bold text-base text-brown-dark tracking-wider uppercase">
            Bienvenue chez Zen Lounge
          </h2>
          <h3 className="text-3xl sm:text-4xl font-medium">
            Laissez-vous guider, étape par étape.
          </h3>
          <img src="/shape-2.svg" alt="" className="w-[200px] mt-5" />
        </div>
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

        <div className="relative w-full h-full aspect-video max-w-[800px] flex justify-center">
          <Image
            fill
            src="/spa-composition.png"
            alt="spa composition photo"
            className="object-cover"
          />
          <BackgroundIllustration
            src="/leaf-illustration-5.svg"
            position="top-0"
            opacity="opacity-40"
            maxWidth="max-w-[280px] sm:max-w-[500px] md:max-w-[600px]"
          />
        </div>
        {/* <div className="h-[300px] w-[300px] rounded-full bg-rose-dark blur-3xl absolute -z-10 bottom-0 right-0 opacity-40"></div> */}
      </div>
    </section>
  );
};

export default ProcessSection;
