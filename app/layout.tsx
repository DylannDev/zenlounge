import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zen Lounge | Massages, Soins & Séjours Détente",
  description:
    "Situé à La Chaumière en Guyane, notre salon de beauté propose des massages relaxants, soins visage et corps, séjours bien-être et forfaits pour une sérénité absolue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="w-full flex flex-col min-h-screen">
          <div className="flex flex-col mx-auto w-full grow max-w-[1600px] px-2 min-[900px]:px-8 lg:px-10">
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
