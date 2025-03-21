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
  isForfaitsPage?: boolean;
}

const ServicesList: React.FC<ServicesListProps> = ({
  services,
  buttonText,
  isForfaitsPage,
}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-10 auto-rows-fr">
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
            isForfaitsPage={isForfaitsPage}
          />
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
