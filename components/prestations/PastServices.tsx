import ProfileBookingCard from "./ProfileBookingCard";
import ProfileRentBookingCard from "./ProfileRentBookingCard";

const PastServices = ({
  services,
  rentBookings,
}: {
  services: any[];
  rentBookings: RentBookingData[];
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Historique</h2>

      <ul className="space-y-4">
        {services.map((service) => (
          <ProfileBookingCard
            key={service.id}
            service={service}
            isPastBookings
          />
        ))}

        {rentBookings.map((booking) => (
          <ProfileRentBookingCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </div>
  );
};

export default PastServices;
