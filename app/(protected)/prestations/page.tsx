import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import PastServices from "@/components/prestations/PastServices";
import UpcomingServices from "@/components/prestations/UpcomingServices";
import { convertFirebaseTimestamp } from "@/lib/utils";
import { redirect } from "next/navigation";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // ✅ Récupération des services depuis le cache
  const userBookings = await getUserBookings(
    currentUser.uid!,
    currentUser.email!
  );

  // ✅ Vérification et conversion des timestamps
  const bookingsWithDates =
    userBookings?.services?.map((service) => ({
      ...service,
      date: convertFirebaseTimestamp(service.date), // Convertir le timestamp en Date
    })) ?? [];

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

        {/* ✅ Historique des prestations */}
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
