import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ServicesList from "@/components/ServicesList";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";
import { soinsServices } from "@/data";

export const metadata: Metadata = {
  title: "Soins du corps & visage | Zen Lounge",
  description:
    "Gommages exfoliants, enveloppements nourrissants et soins hydratants pour une peau éclatante. Découvrez nos soins bien-être.",
  openGraph: {
    title: "Soins du corps & visage | Zen Lounge",
    description:
      "Gommages exfoliants, enveloppements nourrissants et soins hydratants pour une peau éclatante.",
    url: "https://zenlounge-guyane.vercel.app/soins",
    siteName: "Zen Lounge",
    images: [
      {
        url: "/massage-1.jpg",
        width: 1200,
        height: 630,
        alt: "Soins du corps et visage - Zen Lounge",
      },
    ],
    type: "website",
  },
};

const Soins = () => {
  return (
    <section className="relative max-w-[1200px] mx-auto flex flex-col gap-20 pt-10 pb-20">
      <div>
        <SectionHeader
          title="Découvrez nos soins pour femme"
          subtitle={[
            "Prenez soin de votre peau et révélez votre beauté avec nos rituels sur mesure.",
          ]}
          bigTitle
        />
        <ServicesList services={soinsServices.women} />
      </div>
      <div>
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
      </div>
    </section>
  );
};

export default Soins;
