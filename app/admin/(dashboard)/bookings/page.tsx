import { fetchBookings } from "@/actions/fetchBookings";
import BookingsTable from "@/components/admin/BookingsTable";

const UpcomingBookingPage = async () => {
  const allBookings = await fetchBookings();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingBookings = allBookings
    .filter((booking) => booking.date && booking.date >= today) // Garde les rendez-vous à venir
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Trie du plus proche au plus éloigné

  return (
    <section className="w-full">
      {upcomingBookings.length === 0 ? (
        <p className="text-gray-500 mt-4">Aucun rendez-vous à venir.</p>
      ) : (
        <BookingsTable bookings={upcomingBookings} />
      )}
    </section>
  );
};

export default UpcomingBookingPage;
