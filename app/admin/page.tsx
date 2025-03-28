export const dynamic = "force-dynamic";

import { getAdminStatus } from "@/actions/getAdminStatus";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Logo from "@/components/Logo";
import { redirect } from "next/navigation";

export default async function AdminLogin() {
  const isAdmin = await getAdminStatus();

  // ✅ Vérification de l'utilisateur
  if (isAdmin) {
    redirect("/admin/bookings"); // ✅ Redirection si admin
  }

  return (
    <section className="max-w-[550px] h-screen w-full mx-auto pt-40 pb-20 flex flex-col justify-center items-center gap-6 relative px-4">
      <div className="absolute top-16">
        <Logo />
      </div>
      <div className="px-2">
        <h1 className="text-3xl font-bold text-center mb-4">
          Compte administrateur
        </h1>
        <p className="text-center text-blue-light mb-6">
          Connectez-vous pour gérer vos réservations et clients.
        </p>
      </div>
      <AdminLoginForm />
    </section>
  );
}
