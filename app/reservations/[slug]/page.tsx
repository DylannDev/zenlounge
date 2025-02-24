import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import ServiceBooking from "@/components/ServiceBooking";

export default async function ForfaitBookingPage() {
  const user = await getCurrentUser();

  // 🔹 Récupérer les services, forfaits et crédits
  const userBookings = user && (await getUserBookings(user.uid, user.email!));

  // ✅ Vérification et assignation correcte
  const credits = userBookings?.credits ?? [];

  console.log("credits", credits);

  return <ServiceBooking credits={credits} />;
}
