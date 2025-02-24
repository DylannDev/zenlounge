import SectionHeader from "@/components/SectionHeader";
import ServicesList from "@/components/ServicesList";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";
import { soinsServices } from "@/data";

const Soins = () => {
  return (
    <section className="relative max-w-[1200px] mx-auto flex flex-col pt-10 pb-40">
      <SectionHeader
        title="Découvrez nos soins pour femme"
        subtitle={[
          "Prenez soin de votre peau et révélez votre beauté avec nos rituels sur mesure.",
        ]}
        bigTitle
      />
      <ServicesList services={soinsServices.women} />
      <SectionHeader
        title="Découvrez nos soins pour homme"
        subtitle={[
          "Offrez à votre peau et votre corps des soins adaptés pour un bien-être absolu.",
        ]}
        bigTitle
      />
      <ServicesList services={soinsServices.men} />
      <BackgroundIllustration
        src="/leaf-illustration-1.svg"
        position="top-[50px] -right-12"
        opacity="opacity-40"
        maxWidth="max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
      />
    </section>
  );
};

export default Soins;
