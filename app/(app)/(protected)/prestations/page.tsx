import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import CreditServices from "@/components/prestations/CreditServices";
import ForfaitServices from "@/components/prestations/ForfaitServices";
import PastServices from "@/components/prestations/PastServices";
import UpcomingServices from "@/components/prestations/UpcomingServices";
import { convertFirebaseTimestamp } from "@/lib/utils";
import { redirect } from "next/navigation";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // ✅ Récupération des services et forfaits
  const userBookings = await getUserBookings(
    currentUser.uid!,
    currentUser.email!
  );

  // ✅ Conversion des timestamps en Date et tri des forfaits par date décroissante (plus récent en premier)
  const userForfaits: Forfait[] =
    userBookings?.forfaits
      ?.map((forfait: ForfaitFirebase) => ({
        ...forfait,
        createdAt: convertFirebaseTimestamp(forfait.createdAt),
      }))
      .sort(
        (a: Forfait, b: Forfait) =>
          b.createdAt!.getTime() - a.createdAt!.getTime()
      ) ?? []; // ✅ Tri décroissant

  const bookingsWithDates =
    userBookings?.services
      ?.map((service) => ({
        ...service,
        date: convertFirebaseTimestamp(service.date),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime()) ?? []; // ✅ Tri par date la plus proche

  // ✅ Récupérer les crédits utilisateurs
  const userCredits = userBookings?.credits?.map((credit: any) => ({
    ...credit,
  }));

  // ✅ Séparation des services passés et à venir
  const now = new Date();
  const upcomingBookings = bookingsWithDates.filter(
    (s) => s.date && s.date > now
  );
  const pastBookings = bookingsWithDates.filter((s) => s.date && s.date <= now);

  return (
    <section className="flex flex-col gap-8 max-w-[800px] w-full mx-auto my-20">
      <h1 className="text-4xl font-bold">Vos Prestations</h1>

      <div className="flex flex-col gap-12">
        {/* ✅ Services à venir */}
        <UpcomingServices services={upcomingBookings} />

        {/* ✅ Credits (s'il y en a) */}
        {userCredits.length !== 0 && (
          <>
            <hr />
            <CreditServices credits={userCredits} />
          </>
        )}

        {/* ✅ Forfaits actifs (s'il y en a) */}
        {userForfaits.length !== 0 && (
          <>
            <hr />
            <ForfaitServices forfaits={userForfaits} />
          </>
        )}

        {/* ✅ Historique des prestations (s'il y en a) */}
        {pastBookings.length !== 0 && (
          <>
            <hr />
            <PastServices services={pastBookings} />
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
