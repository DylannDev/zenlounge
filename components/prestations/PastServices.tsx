import ProfileServiceCard from "./ProfileServiceCard";

const PastServices = ({ services }: { services: any[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Historique</h2>
      {services.length === 0 ? (
        <p className="text-blue-light">Aucune prestation passée.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <ProfileServiceCard key={service.id} service={service} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PastServices;
