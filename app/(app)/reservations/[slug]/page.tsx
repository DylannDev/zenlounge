import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import ServiceBooking from "@/components/ServiceBooking";

export default async function BookingPage() {
  const user = await getCurrentUser();

  // 🔹 Récupérer les services, forfaits et crédits
  const userBookings = user && (await getUserBookings(user.uid, user.email!));

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normaliser à minuit

  // 🔹 Filtrer les crédits actifs (non expirés)
  const activeCredits =
    userBookings?.credits?.filter((credit) => {
      const expiresAt = new Date(credit.expiresAt);
      expiresAt.setHours(0, 0, 0, 0); // Normaliser la date d'expiration
      return expiresAt >= now; // Exclure les crédits expirés
    }) ?? [];

  return <ServiceBooking credits={activeCredits} />;
}
