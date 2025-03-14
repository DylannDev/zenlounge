import SectionHeader from "@/components/SectionHeader";
import ServicesList from "@/components/ServicesList";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";
import { forfaitSeances } from "@/data";

const Forfaits = () => {
  return (
    <section className="relative max-w-[1200px] mx-auto flex flex-col gap-20 pt-10 pb-20">
      {/* Section 5 séances */}
      <div>
        <SectionHeader
          title="Nos Forfaits 5 Séances"
          subtitle={[
            "Tous nos forfaits peuvent être partagés avec la personne de votre choix.",
          ]}
          bigTitle
        />
        <ServicesList
          services={forfaitSeances.fiveSessions}
          buttonText="Réserver mes 5 séances"
          isForfaitsPage={true}
        />
      </div>

      {/* Section 10 séances */}
      <div>
        <SectionHeader
          title="Nos Forfaits 10 Séances"
          subtitle={[
            "Tous nos forfaits peuvent être partagés avec la personne de votre choix.",
          ]}
          bigTitle
        />
        <ServicesList
          services={forfaitSeances.tenSessions}
          buttonText="Réserver mes 10 séances"
          isForfaitsPage={true}
        />
      </div>

      {/* Background Illustration */}
      <BackgroundIllustration
        src="/leaf-illustration-1.svg"
        position="top-[50px] -right-12"
        opacity="opacity-40"
        maxWidth="max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
      />
    </section>
  );
};

export default Forfaits;
