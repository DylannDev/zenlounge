import { Metadata } from "next";
import { getCurrentUser } from "@/actions/authActions";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Connexion | Zen Lounge Guyane",
  description:
    "Connectez-vous à votre espace Zen Lounge et réservez vos massages, soins et séjours détente en toute simplicité.",
  robots: "noindex, nofollow",
};

const LoginPage = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect("/profil");

  return (
    <section className="max-w-[550px] w-full mx-auto py-20 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue !</h1>
        <p className="text-center text-blue-light mb-6">
          Connectez-vous ou créez un compte pour réserver vos prestations.
        </p>
      </div>
      <AuthForm />
    </section>
  );
};

export default LoginPage;
