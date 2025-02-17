import { getCurrentUser } from "@/actions/authActions";
import { getUserBookings } from "@/actions/getUserBookings";
import ForfaitBooking from "@/components/ForfaitBooking";
import { convertFirebaseTimestamp } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function ForfaitBookingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // 🔹 Récupérer les forfaits actifs de l'utilisateur
  const { forfaits } =
    user && ((await getUserBookings(user.uid, user.email!)) as ForfaitsBooking);

  const activeForfaits =
    forfaits?.map((forfait) => ({
      ...forfait,
      createdAt: convertFirebaseTimestamp(forfait.createdAt),
    })) ?? [];

  return <ForfaitBooking forfaits={activeForfaits} />;
}
