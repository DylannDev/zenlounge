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
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  name,
  description,
  duration,
  price,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-rose-dark">
      <div className="flex flex-col p-5 gap-5">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full h-full aspect-square max-h-[300px]">
            <Image
              fill
              src={imageUrl}
              alt={`${name} photo`}
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div className="w-full py-5 md:p-5 flex flex-col justify-between text-sm font-medium">
            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-bold text-brown-background">
                {name}
              </h3>
              <p className="text-base text-blue-light mt-2">{description}</p>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 mt-4 text-blue-light">
              {/* Duration */}
              <div className="flex items-center gap-2">
                <span className="text-xl text-brown-dark">
                  <PiTimer />
                </span>
                <p>{duration}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl text-brown-dark">
                  <PiCurrencyEur />
                </span>
                <p>{price}</p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <Button color="empty">Réserver mon moment</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
