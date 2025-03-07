import ProfileRentBookingCard from "./ProfileRentBookingCard";

const RentBookings = ({
  rentBookings,
}: {
  rentBookings: RentBookingData[];
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vos Locations</h2>
      <ul className="space-y-4">
        {rentBookings.map((booking) => (
          <ProfileRentBookingCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </div>
  );
};

export default RentBookings;
