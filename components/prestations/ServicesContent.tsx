import { getUserBookings } from "@/actions/getUserBookings";
import CreditServices from "@/components/prestations/CreditServices";
import ForfaitServices from "@/components/prestations/ForfaitServices";
import PastServices from "@/components/prestations/PastServices";
import UpcomingServices from "@/components/prestations/UpcomingServices";
import RentBookings from "@/components/prestations/RentBookings";
import { PiCheckCircleDuotone, PiWarning } from "react-icons/pi";
import { profileInformations } from "@/data";
import { filterBookings } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralInformations from "../GeneralInformations";

const ServicesContent = async ({
  currentUser,
}: {
  currentUser:
    | {
        uid: string;
        email: string | undefined;
        provider: string;
        error?: undefined;
      }
    | {
        error: unknown;
        uid?: undefined;
        email?: undefined;
        provider?: undefined;
      }
    | null;
}) => {
  // ✅ Récupération des services, forfaits et locations
  const userBookings =
    currentUser &&
    (await getUserBookings(currentUser.uid!, currentUser.email!));

  // ✅ Extraction des réservations normales et des locations
  const bookings = userBookings?.services ?? [];
  const userForfaits = userBookings?.forfaits ?? [];
  const userCredits = userBookings?.credits ?? [];

  // ✅ Filtrer les réservations
  const {
    upcomingBookings,
    pastBookings,
    upcomingRentBookings,
    pastRentBookings,
  } = filterBookings(bookings);

  // ✅ Tri des forfaits par date décroissante
  const sortedForfaits = [...userForfaits].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <>
      <h1 className="text-4xl font-bold">Vos Prestations</h1>

      <Tabs defaultValue="upcoming" className="w-full flex flex-col gap-4">
        {/* ✅ Tabs Navigation */}
        <TabsList className="flex justify-start space-x-2 pb-2 overflow-hidden overflow-x-scroll scrollbar-hidden">
          <TabsTrigger value="upcoming">Prestations à venir</TabsTrigger>
          <TabsTrigger value="forfaits">Forfaits</TabsTrigger>
          {userCredits.length > 0 && (
            <TabsTrigger value="credits">Crédits</TabsTrigger>
          )}
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        {/* ✅ Services à venir */}
        <TabsContent value="upcoming">
          <UpcomingServices services={upcomingBookings} />
          {upcomingRentBookings.length > 0 && (
            <RentBookings rentBookings={upcomingRentBookings} />
          )}
        </TabsContent>

        {/* ✅ Forfaits */}
        <TabsContent value="forfaits">
          <ForfaitServices forfaits={sortedForfaits} />
        </TabsContent>

        {/* ✅ Crédits */}
        {userCredits.length > 0 && (
          <TabsContent value="credits">
            <CreditServices credits={userCredits} />
          </TabsContent>
        )}

        {/* ✅ Historique des prestations */}
        <TabsContent value="history">
          {pastBookings.length > 0 || pastRentBookings.length > 0 ? (
            <PastServices
              services={pastBookings}
              rentBookings={pastRentBookings}
            />
          ) : (
            <p className="text-left text-blue-light">
              Aucun historique disponible.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* ✅ Informations Générales */}
      <hr />
      <GeneralInformations />
    </>
  );
};

export default ServicesContent;
