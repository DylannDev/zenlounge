import React from "react";
import ServiceCard from "@/components/ServiceCard";

interface ServicesListProps {
  services: {
    imageUrl: string;
    name: string;
    description: string;
    duration: string;
    price: string;
  }[];
  buttonText?: string; // Prop pour le texte des boutons
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
            buttonText={buttonText} // Passe le texte à ServiceCard
          />
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
