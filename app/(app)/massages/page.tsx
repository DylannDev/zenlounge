import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ServicesList from "@/components/ServicesList";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";
import { massageServices } from "@/data";

export const metadata: Metadata = {
  title: "Massages Relaxants & Thérapeutiques | Zen Lounge",
  description:
    "Détendez votre corps et votre esprit avec nos massages personnalisés. Profitez d'un moment de bien-être absolu dans un cadre apaisant.",
  openGraph: {
    title: "Massages Relaxants & Thérapeutiques | Zen Lounge",
    description:
      "Détendez votre corps et votre esprit avec nos massages personnalisés. Profitez d'un moment de bien-être absolu.",
    url: "https://zenlounge-guyane.fr/massages",
    siteName: "Zen Lounge",
    images: [
      {
        url: "/images/massage-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Massages relaxants chez Zen Lounge",
      },
    ],
    type: "website",
  },
};

const Massages = () => {
  return (
    <section className="relative max-w-[1200px] mx-auto flex flex-col pt-10 pb-20">
      <SectionHeader
        title="Découvrez nos massages"
        subtitle={[
          "Offrez-vous un moment de détente et de bien-être sur mesure.",
        ]}
        bigTitle
      />
      <ServicesList services={massageServices} />

      <BackgroundIllustration
        src="/leaf-illustration-1.svg"
        position="top-[50px] -right-12"
        opacity="opacity-40"
        maxWidth="max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
      />
    </section>
  );
};

export default Massages;
