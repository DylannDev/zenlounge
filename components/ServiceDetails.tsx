import React from "react";
import Image from "next/image";
import { PiTimer, PiWallet } from "react-icons/pi";

interface ServiceDetailsProps {
  service: {
    imageUrl: string;
    name: string;
    description: string;
    duration: string;
    price: string;
  };
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <div className="relative aspect-square w-full">
      <Image
        fill
        src={service.imageUrl}
        alt={service.name}
        className="object-cover rounded-3xl"
      />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-xl text-white bg-brown-background/40 backdrop-blur-xl w-full">
          <h1 className="text-4xl font-bold">{service.name}</h1>
          <p className="text-lg mt-2">{service.description}</p>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl text-rose-dark">
                <PiTimer />
              </span>
              <p>{service.duration}</p>
            </div>
            <span className="text-xl">|</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl text-rose-dark">
                <PiWallet />
              </span>
              <p>{service.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
