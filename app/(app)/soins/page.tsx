import { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ServicesList from "@/components/ServicesList";
import BackgroundIllustration from "@/components/ui/BackgroundIllustration";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo/jsonLd";
import { soinsServices } from "@/data";
import { fetchReviews } from "@/actions/fetchReviews";

export const metadata: Metadata = {
  title: "Soin du Visage & du Corps à Matoury (Cayenne, Guyane)",
  description:
    "Soins du visage et du corps à Cayenne / Matoury : gommages, rituels visage, soins hommes et femmes, manucure, pédicure. Réservez votre soin chez Zen Lounge en Guyane.",
  alternates: { canonical: "/soins" },
  openGraph: {
    title: "Soin du Visage & du Corps — Zen Lounge",
    description:
      "Gommages exfoliants, enveloppements nourrissants et soins hydratants pour une peau éclatante à Cayenne / Matoury.",
    url: "https://zenlounge-guyane.fr/soins",
    siteName: "Zen Lounge",
    images: [
      {
        url: "/evasion-feminine.jpg",
        width: 1200,
        height: 630,
        alt: "Soins du corps et du visage chez Zen Lounge à Cayenne / Matoury",
      },
    ],
    type: "website",
  },
};

const Soins = async () => {
  const reviews = await fetchReviews();
  const aggregateRating =
    reviews.length > 0
      ? {
          ratingValue:
            reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length,
          reviewCount: reviews.length,
        }
      : undefined;

  const allSoins = [...soinsServices.women, ...soinsServices.men];

  const serviceJsonLd = buildServiceJsonLd({
    categoryName: "Soins du visage et du corps à Cayenne",
    categoryDescription:
      "Soins du visage, soins du corps, gommages, rituels et soins homme et femme à l'institut Zen Lounge à Matoury (Cayenne, Guyane).",
    url: "https://zenlounge-guyane.fr/soins",
    items: allSoins,
    aggregateRating,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Soins", url: "/soins" },
  ]);

  return (
    <div className="relative max-w-[1200px] mx-auto pt-10 pb-20">
      <JsonLd id="ld-service-soins" data={serviceJsonLd} />
      <JsonLd id="ld-breadcrumb-soins" data={breadcrumbJsonLd} />
      <Breadcrumb
        items={[
          { name: "Accueil", href: "/" },
          { name: "Soins", href: "/soins" },
        ]}
      />
      <section className="flex flex-col gap-20">
        <div>
        <SectionHeader
          as="h1"
          title="Soins du visage & du corps à Matoury"
          subtitle={[
            "Prenez soin de votre peau et révélez votre beauté avec nos rituels sur mesure pour femme.",
          ]}
          bigTitle
        />
        <ServicesList services={soinsServices.women} />
      </div>
      <div>
        <SectionHeader
          title="Nos soins bien-être pour homme"
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
    </div>
  );
};

export default Soins;
