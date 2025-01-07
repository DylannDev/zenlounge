import type { Metadata } from "next";
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
      <body
        // className={`bg-gradient-to-b from-rose-background/80 from-0% to-white to-30% antialiased`}
        className="bg-white overflow-x-hidden"
      >
        <div className="w-full flex flex-col min-h-screen">
          <div className="flex flex-col flex-grow mx-auto w-full max-w-[1600px] px-5 min-[900px]:px-8 lg:px-10">
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
