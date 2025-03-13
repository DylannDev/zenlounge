import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import ForfaitBooking from "@/components/ForfaitBooking";
import { redirect } from "next/navigation";

export default async function ForfaitBookingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // 🔹 Récupérer les forfaits actifs de l'utilisateur
  const { forfaits } =
    user && ((await getUserBookings(user.uid, user.email!)) as ForfaitsBooking);

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normaliser à minuit

  const activeForfaits =
    forfaits
      ?.map((forfait) => ({
        ...forfait,
      }))
      .filter((forfait) => {
        const expiresAt = new Date(forfait.expiresAt);
        expiresAt.setHours(0, 0, 0, 0);
        return expiresAt >= now; // Exclure les forfaits expirés
      }) ?? [];

  return <ForfaitBooking forfaits={activeForfaits} />;
}
