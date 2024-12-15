import Button from "@/components/Button";
import Hero from "@/components/Hero";
import InfoSection from "@/components/Infosection";
import BusinessInfoSection from "@/components/Infosection";
import ProcessSection from "@/components/ProcessSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <InfoSection />
    </>
  );
}
