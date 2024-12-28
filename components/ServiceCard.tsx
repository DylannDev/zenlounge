import React from "react";
import Button from "./Button";
import Image from "next/image";
import { PiCurrencyEur, PiTimer } from "react-icons/pi";

interface ServiceCardProps {
  imageUrl: string;
  name: string;
  description: string;
  duration: string;
  price: string;
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
        <div className="flex flex-col h-full md:flex-row">
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
          <div className="w-full h-full py-5 md:px-5 md:py-2 flex flex-col grow justify-between text-sm font-medium">
            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-bold text-brown-background mb-4">
                {name}
              </h3>
              <p className="text-base text-blue-light">{description}</p>
            </div>

            {/* Details */}
            <div className="flex flex-col md:flex-row gap-2 mt-4 text-blue-light">
              {/* Duration */}
              <div className="flex items-center gap-1">
                <span className="text-xl text-brown-dark">
                  <PiTimer />
                </span>
                <p>{duration}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1">
                <span className="text-xl text-brown-dark">
                  <PiCurrencyEur />
                </span>
                <p>{price}</p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <Button href={`/reservations/${slug}`} color="rose">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
