import ProfileRentBookingCard from "./ProfileRentBookingCard";

const RentBookings = ({
  rentBookings,
}: {
  rentBookings: RentBookingData[];
}) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Vos Locations</h2>
      <ul className="space-y-4">
        {rentBookings.map((booking) => (
          <ProfileRentBookingCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </div>
  );
};

export default RentBookings;
