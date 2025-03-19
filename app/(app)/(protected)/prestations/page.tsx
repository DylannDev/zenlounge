import { checkCookies, getCurrentUser } from "@/actions/authActions";
import { redirect } from "next/navigation";
import ServicesContent from "@/components/prestations/ServicesContent";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();
  const result = await checkCookies();

  console.log("currentUser", currentUser);
  console.log("checkCookies", result);

  // if (!currentUser) {
  //   // redirect("/login");
  // }

  return (
    <section className="flex flex-col gap-12 max-w-[800px] w-full mx-auto my-20">
      <Suspense fallback={<Loader text="Chargement du compte..." fullScreen />}>
        <ServicesContent currentUser={currentUser} />
      </Suspense>
    </section>
  );
};

export default ServicesPage;
