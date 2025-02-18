import ProfileBookingCard from "./ProfileBookingCard";

const PastServices = ({ services }: { services: any[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Historique</h2>

      <ul className="space-y-4">
        {services.map((service) => (
          <ProfileBookingCard
            key={service.id}
            service={service}
            isPastBookings
          />
        ))}
      </ul>
    </div>
  );
};

export default PastServices;
