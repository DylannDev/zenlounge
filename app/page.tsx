import ClientsReviews from "@/components/ClientsReviews";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import InfoSection from "@/components/Infosection";
import ProcessSection from "@/components/ProcessSection";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <div className="max-w-[1200px] mx-auto">
        <ProcessSection />
        <Services />
        <ClientsReviews />
        <Faq />
      </div>
    </div>
  );
}
