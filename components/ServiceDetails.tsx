import React from "react";
import Image from "next/image";
import { PiTimer, PiWallet } from "react-icons/pi";
import { forfaitSeances } from "@/data";

interface ServiceDetailsProps {
  service: {
    imageUrl: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    slug: string;
  };
  activeForfait?:
    | {
        id: string;
        serviceName: string;
        remainingSessions: number;
        totalSessions: number;
        price: number;
        createdAt: Date;
      }
    | undefined;
  activeCredit?: Credit;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  activeForfait,
  activeCredit,
}) => {
  // Vérifier si le service est un forfait 5 ou 10 séances
  const isFiveSessions = forfaitSeances.fiveSessions.some(
    (forfait) => forfait.slug === service.slug
  );
  const isTenSessions = forfaitSeances.tenSessions.some(
    (forfait) => forfait.slug === service.slug
  );

  return (
    <div className="relative aspect-square w-full h-full">
      <Image
        fill
        src={service.imageUrl}
        alt={service.name}
        className="object-cover rounded-3xl"
      />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-xl text-white bg-brown-background/40 backdrop-blur-xl w-full">
          <h1 className="text-xl sm:text-2xl font-bold">{service.name}</h1>
          <p className="hidden min-[500px]:flex text-sm sm:text-[14.5px] md:text-base mt-2">
            {service.description}
          </p>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            {/* Forfait Sessions (5 ou 10 séances) */}
            {(isFiveSessions || isTenSessions) && (
              <div className="flex items-center px-3 py-1 text-sm font-semibold bg-rose-dark text-brown-dark rounded-lg w-fit">
                {isFiveSessions ? "Forfait 5 séances" : "Forfait 10 séances"}
              </div>
            )}

            {/* Durée */}
            <div className="flex gap-2">
              <div className="text-sm flex items-center gap-1">
                <span className="text-xl text-rose-dark">
                  <PiTimer />
                </span>
                <p>{service.duration} min</p>
              </div>
              <span className="text-xl">|</span>

              {/* Prix ou Crédit utilisé */}
              <div className="flex items-center gap-1">
                <span className="text-xl text-rose-dark">
                  <PiWallet />
                </span>
                <p>
                  {activeForfait
                    ? "Inclus dans le forfait"
                    : activeCredit
                      ? "Crédit utilisé"
                      : `${service.price} €`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
