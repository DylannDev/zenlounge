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
import { forfaitSeances } from "@/data";
import { fetchReviews } from "@/actions/fetchReviews";

export const metadata: Metadata = {
  title:
    "Forfaits Massages 5 ou 10 Séances à Cayenne — Tarifs Dégressifs",
  description:
    "Forfaits massages et soins bien-être à Cayenne / Matoury : 5 ou 10 séances à tarifs dégressifs, jusqu'à 20% d'économies. Idéal solo ou en duo. Réservez chez Zen Lounge.",
  alternates: { canonical: "/forfaits" },
  openGraph: {
    title: "Forfaits Bien-Être 5 ou 10 Séances — Zen Lounge Cayenne",
    description:
      "Prenez soin de vous toute l'année avec nos forfaits avantageux à Cayenne / Matoury. Jusqu'à 20% d'économies.",
    url: "https://zenlounge-guyane.fr/forfaits",
    siteName: "Zen Lounge",
    images: [
      {
        url: "/massage-dos.jpg",
        width: 1200,
        height: 630,
        alt: "Forfaits massages et soins Zen Lounge à Cayenne / Matoury",
      },
    ],
    type: "website",
  },
};

const Forfaits = async () => {
  const reviews = await fetchReviews();
  const aggregateRating =
    reviews.length > 0
      ? {
          ratingValue:
            reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length,
          reviewCount: reviews.length,
        }
      : undefined;

  const allForfaits = [
    ...forfaitSeances.fiveSessions,
    ...forfaitSeances.tenSessions,
  ];

  const serviceJsonLd = buildServiceJsonLd({
    categoryName: "Forfaits massages & soins bien-être à Cayenne",
    categoryDescription:
      "Forfaits 5 ou 10 séances de massages et soins à tarifs dégressifs à l'institut Zen Lounge à Matoury (Cayenne, Guyane).",
    url: "https://zenlounge-guyane.fr/forfaits",
    items: allForfaits,
    aggregateRating,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Forfaits", url: "/forfaits" },
  ]);

  return (
    <div className="relative max-w-[1200px] mx-auto pt-10 pb-20">
      <JsonLd id="ld-service-forfaits" data={serviceJsonLd} />
      <JsonLd id="ld-breadcrumb-forfaits" data={breadcrumbJsonLd} />
      <Breadcrumb
        items={[
          { name: "Accueil", href: "/" },
          { name: "Forfaits", href: "/forfaits" },
        ]}
      />
      <section className="flex flex-col gap-20">
        {/* Section 5 séances */}
        <div>
        <SectionHeader
          as="h1"
          title="Forfaits massages 5 séances à Matoury"
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
          title="Forfaits massages 10 séances"
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
    </div>
  );
};

export default Forfaits;
