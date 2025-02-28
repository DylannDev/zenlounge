import { fetchBookings } from "@/actions/fetchBookings";
import BookingsTable from "@/components/admin/BookingsTable";

const HistoryPage = async () => {
  const allBookings = await fetchBookings();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const pastBookings = allBookings
    .filter((booking) => booking.date && booking.date < today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="w-full">
      {pastBookings.length === 0 ? (
        <p className="text-gray-500 mt-4">
          Vous n'avez pas encore eu de prestations.
        </p>
      ) : (
        <BookingsTable bookings={pastBookings} isPastbookings />
      )}
    </section>
  );
};

export default HistoryPage;
