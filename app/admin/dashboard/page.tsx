import { getCurrentUser } from "@/actions/authActions";
import { fetchBookings } from "@/actions/fetchBookings";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
  const user = await getCurrentUser();

  // 🔹 Rediriger si l'utilisateur n'est pas connecté
  if (!user) {
    redirect("/admin");
  }

  // 🔹 Récupérer toutes les réservations à venir
  const allBookings = await fetchBookings();

  // ✅ Trier les réservations par date (du plus proche au plus éloigné)
  const upcomingBookings = allBookings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="max-w-[800px] w-full mx-auto my-20">
      <h1 className="text-4xl font-bold">Tableau de bord Admin</h1>

      <h2 className="text-2xl mt-6">Prochains Rendez-vous</h2>

      {upcomingBookings.length === 0 ? (
        <p className="text-gray-500 mt-4">Aucun rendez-vous à venir.</p>
      ) : (
        <ul className="mt-4">
          {upcomingBookings.map((booking) => (
            <li key={booking.id} className="border p-4 my-2 rounded-lg">
              <p>
                <strong>{booking.serviceName}</strong> -{" "}
                {booking.date.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                à {booking.time}
              </p>
              <p>Email client : {booking.clientEmail || "Non renseigné"}</p>
              <p>
                Durée : {booking.duration} min | Prix : {booking.price} €
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminDashboard;
