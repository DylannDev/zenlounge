import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Lounge | Massages, Soins & Séjours Détente en Guyane",
  description:
    "Situé à Matoury en Guyane, notre institut propose des massages relaxants, soins visage et corps, séjours bien-être et forfaits pour une sérénité absolue.",
  openGraph: {
    title: "Zen Lounge | Massages, Soins & Séjours Détente",
    description:
      "Découvrez nos prestations bien-être : massages relaxants, soins du corps et séjours détente dans un cadre apaisant en Guyane.",
    url: "https://zenlounge-guyane.fr",
    type: "website",
    siteName: "Zen Lounge",
    locale: "fr_FR",
    images: [
      {
        url: "https://zenlounge-guyane.fr/massage-1.jpg",
        width: 2880,
        height: 1920,
        alt: "Zen Lounge - Massages, Soins & Séjours Détente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zen Lounge | Massages, Soins & Séjours Détente",
    description:
      "Offrez-vous un moment de bien-être avec nos massages, soins du corps et séjours détente en Guyane.",
    images: ["https://zenlounge-guyane.fr/massage-1.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-white">{children}</body>
    </html>
  );
}
