import ClientsReviews from "@/components/ClientsReviews";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import Services from "@/components/Services";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";

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

      <div className="overflow-hidden">
        <BackgroundIllustration
          src="/leaf-illustration-2.svg"
          position="top-[calc(100dvh+2350px)] -left-[100px]"
          opacity="opacity-30"
          maxWidth="max-w-[200px] sm:max-w-[250px]"
        />

        <BackgroundIllustration
          src="/leaf-illustration-6.svg"
          position="top-[calc(100dvh+3080px)] -right-[50px]"
          opacity="opacity-30"
          maxWidth="max-w-[200px] sm:max-w-[250px]"
        />
        <BackgroundIllustration
          src="/leaf-illustration-4.svg"
          position="top-[calc(100dvh+4500px)] left-[50px] rotate-180"
          opacity="opacity-30"
          maxWidth="max-w-[200px] sm:max-w-[250px]"
        />
        <BackgroundIllustration
          src="/leaf-illustration-1.svg"
          position="top-[calc(100dvh+5200px)] -right-[100px]"
          opacity="opacity-30"
          maxWidth="max-w-[200px] sm:max-w-[250px]"
        />
      </div>
    </div>
  );
}
