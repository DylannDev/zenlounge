import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Lounge | Massages, Soins & Séjours Détente",
  description:
    "Situé à La Chaumière en Guyane, notre institut propose des massages relaxants, soins visage et corps, séjours bien-être et forfaits pour une sérénité absolue.",
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
