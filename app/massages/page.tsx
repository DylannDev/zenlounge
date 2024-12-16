import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { massageServices } from "@/data";

const Massages = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col pt-10 pb-40">
      <SectionHeader
        title="Découvrez nos massages"
        subtitle={[
          "Offrez-vous un moment de détente et de bien-être sur mesure.",
        ]}
        bigTitle
      />
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full mt-20">
        {massageServices.map((service, index) => (
          <li key={index}>
            <ServiceCard
              imageUrl={service.imageUrl}
              name={service.name}
              description={service.description}
              duration={service.duration}
              price={service.price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Massages;
