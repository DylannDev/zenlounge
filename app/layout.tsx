import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://zenlounge-guyane.fr"),
  title: {
    default:
      "Institut de Bien-être à Cayenne (Matoury) — Massages & Soins | Zen Lounge",
    template: "%s | Zen Lounge",
  },
  description:
    "Institut de bien-être à Matoury (Cayenne, Guyane). Massages relaxants et thérapeutiques, soins du visage et du corps, forfaits avantageux et séjours détente. Réservation en ligne.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zen Lounge — Institut de Bien-être à Cayenne / Matoury",
    description:
      "Massages, soins du visage et du corps, forfaits et séjours détente dans un cadre apaisant en Guyane.",
    url: "https://zenlounge-guyane.fr",
    type: "website",
    siteName: "Zen Lounge",
    locale: "fr_FR",
    images: [
      {
        url: "/massage-1.jpg",
        width: 2880,
        height: 1920,
        alt: "Zen Lounge — Institut de bien-être à Cayenne / Matoury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zen Lounge — Institut de Bien-être à Cayenne / Matoury",
    description:
      "Massages, soins du corps et du visage, forfaits et séjours détente en Guyane.",
    images: ["/massage-1.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="bg-white">
        <JsonLd id="ld-local-business" data={localBusinessJsonLd} />
        {children}
      </body>
    </html>
  );
}
