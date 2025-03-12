import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import CreditServices from "@/components/prestations/CreditServices";
import ForfaitServices from "@/components/prestations/ForfaitServices";
import PastServices from "@/components/prestations/PastServices";
import UpcomingServices from "@/components/prestations/UpcomingServices";
import RentBookings from "@/components/prestations/RentBookings"; // 🔥 Nouveau composant pour la location
import { redirect } from "next/navigation";
import { PiCheckCircleDuotone, PiInfo, PiInfoBold } from "react-icons/pi";
import { profileInformations } from "@/data";

const ServicesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // ✅ Récupération des services, forfaits et locations
  const userBookings = await getUserBookings(
    currentUser.uid!,
    currentUser.email!
  );

  // ✅ Extraction des réservations normales et des locations
  const bookings = userBookings?.services ?? [];
  const userForfaits = userBookings?.forfaits ?? [];
  const userCredits = userBookings?.credits ?? [];

  // ✅ Séparation entre les réservations standards et celles pour la location
  const rentBookings = bookings.filter(
    (booking) => booking.type === "rentBooking"
  );
  const standardBookings = bookings.filter(
    (booking) => booking.type !== "rentBooking"
  );

  // ✅ Tri des forfaits par date décroissante
  const sortedForfaits = [...userForfaits].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  // ✅ Séparation des services passés et à venir
  const now = new Date();
  const upcomingBookings = standardBookings.filter(
    (s) => s.date && s.date > now
  );
  const pastBookings = standardBookings.filter((s) => s.date && s.date <= now);

  return (
    <section className="flex flex-col gap-8 max-w-[800px] w-full mx-auto my-20">
      <h1 className="text-4xl font-bold">Vos Prestations</h1>

      <div className="flex flex-col gap-6">
        {/* ✅ Services à venir */}
        <UpcomingServices services={upcomingBookings} />

        {/* ✅ Réservations de location (si existantes) */}
        {rentBookings.length > 0 && (
          <>
            <hr />
            <RentBookings rentBookings={rentBookings} />
          </>
        )}

        {/* ✅ Credits (s'il y en a) */}
        {userCredits.length > 0 && (
          <>
            <hr />
            <CreditServices credits={userCredits} />
          </>
        )}

        {/* ✅ Forfaits actifs (s'il y en a) */}
        {sortedForfaits.length > 0 && (
          <>
            <hr />
            <ForfaitServices forfaits={sortedForfaits} />
          </>
        )}

        {/* ✅ Historique des prestations (s'il y en a) */}
        {pastBookings.length > 0 && (
          <>
            <hr />
            <PastServices services={pastBookings} />
          </>
        )}

        <hr />
        <h2 className="text-xl font-bold flex items-center gap-1">
          Informations générales
          <PiInfoBold className="text-base" />
        </h2>
        <ul className="text-blue-light list-none">
          {profileInformations.map((info) => (
            <li key={info.id} className="mb-2 flex gap-2 items-center">
              <span>
                <PiCheckCircleDuotone className="text-orange text-lg md:text-xl" />
              </span>
              <span className="text-sm md:text-base">{info.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesPage;
