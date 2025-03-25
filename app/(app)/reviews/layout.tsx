import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis Clients | Zen Lounge Guyane",
  description:
    "Laissez nous votre avis sur nos massages, soins et séjours détente en Guyane.",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
