import React from "react";
import Button from "./Button";
import Image from "next/image";
import { PiCurrencyEur, PiTimer, PiWallet } from "react-icons/pi";

interface ServiceCardProps {
  imageUrl: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  buttonText?: string; // Texte du bouton
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  name,
  description,
  duration,
  price,
  buttonText = "Réserver mon moment", // Valeur par défaut
  slug,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-rose-dark h-full">
      <div className="flex flex-col justify-between h-full p-5 gap-5">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative w-full h-full aspect-square max-h-[300px]">
            <Image
              fill
              src={imageUrl}
              alt={`${name} photo`}
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div className="w-full h-full pt-5 flex flex-col gap-12 grow justify-between text-sm font-medium">
            {/* Title and Description */}
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-brown-background">
                {name}
              </h3>
              <p className="text-base text-blue-light">{description}</p>
            </div>

            {/* Details */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-between">
              <div className="flex gap-2 text-blue-light">
                {/* Duration */}
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xl text-brown-dark">
                    <PiTimer />
                  </span>
                  <p>{duration} min</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1">
                  <span className="text-xl text-brown-dark">
                    <PiWallet />
                  </span>
                  <span>{price}€</span>
                </div>
              </div>

              <Button
                href={`/reservations/${slug}`}
                color="rose"
                responsiveWidth={{
                  default: "large",
                  sm: "normal",
                  md: "large",
                  lg: "normal",
                }}
                compact
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        {/* CTA Button */}
      </div>
    </div>
  );
};

export default ServiceCard;
