import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Zen Lounge | Massages, Soins & Séjours Détente",
  description:
    "Situé à La Chaumière en Guyane, notre salon de beauté propose des massages relaxants, soins visage et corps, séjours bien-être et forfaits pour une sérénité absolue.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow mx-auto w-full max-w-[1600px] px-5 min-[900px]:px-8 lg:px-10 pt-[80px] lg:pt-[120px]">
        {children}
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
