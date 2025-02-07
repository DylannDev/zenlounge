import React from "react";
import { getCurrentUser } from "@/actions/authActions";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification côté serveur si l'utilisateur est connecté
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return <section>{children}</section>;
}
