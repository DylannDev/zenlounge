import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  return (
    <section className="max-w-[550px] h-screen w-full mx-auto py-20 flex flex-col justify-center items-center gap-6 relative">
      <div className="absolute top-20">
        <Logo />
      </div>
      <div>
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
