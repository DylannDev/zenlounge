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
import { massageServices } from "@/data";
import { fetchReviews } from "@/actions/fetchReviews";

export const metadata: Metadata = {
  title: "Massage à Cayenne — Relaxant, Thérapeutique & Énergétique",
  description:
    "Massages à Cayenne / Matoury (Guyane) : massage relaxant, intuitif, pierres chaudes, jambes lourdes, dos & cervicales, massage duo. Réservez votre séance chez Zen Lounge.",
  alternates: { canonical: "/massages" },
  openGraph: {
    title: "Massage à Cayenne — Zen Lounge",
    description:
      "Massages relaxants, thérapeutiques et énergétiques à Cayenne / Matoury. Réservez en ligne chez Zen Lounge.",
    url: "https://zenlounge-guyane.fr/massages",
    siteName: "Zen Lounge",
    images: [
      {
        url: "/massage-1.jpg",
        width: 1200,
        height: 630,
        alt: "Massages relaxants chez Zen Lounge à Cayenne / Matoury",
      },
    ],
    type: "website",
  },
};

const Massages = async () => {
  const reviews = await fetchReviews();
  const aggregateRating =
    reviews.length > 0
      ? {
          ratingValue:
            reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length,
          reviewCount: reviews.length,
        }
      : undefined;

  const serviceJsonLd = buildServiceJsonLd({
    categoryName: "Massages bien-être à Cayenne",
    categoryDescription:
      "Massages relaxants, thérapeutiques et énergétiques à l'institut Zen Lounge à Matoury (Cayenne, Guyane).",
    url: "https://zenlounge-guyane.fr/massages",
    items: massageServices,
    aggregateRating,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Accueil", url: "/" },
    { name: "Massages", url: "/massages" },
  ]);

  return (
    <div className="relative max-w-[1200px] mx-auto pt-10 pb-20">
      <JsonLd id="ld-service-massages" data={serviceJsonLd} />
      <JsonLd id="ld-breadcrumb-massages" data={breadcrumbJsonLd} />
      <Breadcrumb
        items={[
          { name: "Accueil", href: "/" },
          { name: "Massages", href: "/massages" },
        ]}
      />
      <section className="flex flex-col">
        <SectionHeader
          as="h1"
          title="Massages à Matoury"
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
    </div>
  );
};

export default Massages;
