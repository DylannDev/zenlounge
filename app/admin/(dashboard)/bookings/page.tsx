export const dynamic = "force-dynamic";

import { fetchBookings } from "@/actions/fetchBookings";
import BookingsTable from "@/components/admin/BookingsTable";

const BookingsPage = async () => {
  const allBookings = await fetchBookings();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingBookings = allBookings
    .filter((booking) => booking.date && booking.date >= today) // Garde les rendez-vous à venir
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Trie du plus proche au plus éloigné

  const pastBookings = allBookings
    .filter((booking) => booking.date && booking.date < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <section className="w-full">
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500 mt-4">Aucun rendez-vous à venir.</p>
        ) : (
          <BookingsTable bookings={upcomingBookings} />
        )}
      </section>
      <hr className="my-10" />
      <section className="w-full">
        {pastBookings.length === 0 ? (
          <p className="text-gray-500 mt-4">
            Vous n'avez pas encore eu de prestations.
          </p>
        ) : (
          <BookingsTable bookings={pastBookings} isPastbookings />
        )}
      </section>
    </>
  );
};

export default BookingsPage;
