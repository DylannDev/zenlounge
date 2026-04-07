import type { Metadata } from "next";
import MDXContent from "@/components/mdx-content";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Conditions générales de vente (CGV)",
  description:
    "Conditions générales de vente de Zen Lounge : réservation, paiement, annulation, forfaits, location de la Serenity Suite et règlement intérieur.",
  alternates: { canonical: "/cgv" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="max-w-[900px] mx-auto px-2 sm:px-4 py-10 md:py-20">
      <Breadcrumb
        items={[
          { name: "Accueil", href: "/" },
          { name: "CGV", href: "/cgv" },
        ]}
      />
      <MDXContent file="cgv.md" />
    </main>
  );
}
