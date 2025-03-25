import { getCurrentUser } from "@/actions/authActions";
import { permanentRedirect } from "next/navigation";
import ServicesContent from "@/components/prestations/ServicesContent";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return permanentRedirect("/login");
  }

  return (
    <section className="flex flex-col gap-12 max-w-[800px] w-full mx-auto my-20">
      <Suspense fallback={<Loader text="Chargement du compte..." fullScreen />}>
        <ServicesContent currentUser={currentUser} />
      </Suspense>
    </section>
  );
};

export default ServicesPage;
