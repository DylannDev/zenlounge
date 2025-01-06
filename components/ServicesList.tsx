import React from "react";
import ServiceCard from "@/components/ServiceCard";

interface ServicesListProps {
  services: {
    imageUrl: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    slug: string;
  }[];
  buttonText?: string;
}

const ServicesList: React.FC<ServicesListProps> = ({
  services,
  buttonText,
}) => {
  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full mt-10 sm:my-20 auto-rows-fr">
      {services.map((service, index) => (
        <li key={index}>
          <ServiceCard
            imageUrl={service.imageUrl}
            name={service.name}
            description={service.description}
            duration={service.duration}
            price={service.price}
            buttonText={buttonText}
            slug={service.slug}
          />
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
