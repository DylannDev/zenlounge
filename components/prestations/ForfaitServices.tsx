import Button from "@/components/Button";
import ProfileServiceCard from "./ProfileBookingCard";
import ProfileForfaitCard from "./ProfileForfaitCard";

interface ForfaitServicesProps {
  forfaits: {
    id: string;
    serviceName: string;
    remainingSessions: number;
    totalSessions: number;
    price: number;
  }[];
}

const ForfaitServices: React.FC<ForfaitServicesProps> = ({ forfaits }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Vos Forfaits</h2>
      <div className="flex flex-col gap-4">
        <ul className="space-y-4">
          {forfaits.map((forfait) => (
            <ProfileForfaitCard key={forfait.id} forfait={forfait} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForfaitServices;
