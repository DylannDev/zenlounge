import { fetchRentBookings } from "@/actions/fetchRentBookings";
import BookingsTable from "@/components/admin/BookingsTable";
import RentBookingsTable from "@/components/admin/RentBookingsTable";

const RentalsBookingPage = async () => {
  const allRentBookings = await fetchRentBookings();
  console.log("allRentBookings", allRentBookings);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingBookings = allRentBookings
    .filter((booking) => booking.dateTo && booking.dateTo >= today) // Garde les locations à venir
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
    ); // Trie du plus proche au plus éloigné

  const pastBookings = allRentBookings
    .filter((booking) => booking.dateTo && booking.dateTo < today)
    .sort(
      (a, b) => new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
    );

  return (
    <>
      <section className="w-full">
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500 mt-4">
            Pas de location à venir pour le moment.
          </p>
        ) : (
          <RentBookingsTable bookings={upcomingBookings} />
        )}
      </section>
      <section className="w-full">
        {pastBookings.length !== 0 && (
          <>
            <hr className="my-10" />
            <RentBookingsTable bookings={pastBookings} isPastbookings />
          </>
        )}
      </section>
    </>
  );
};

export default RentalsBookingPage;
