import Image from "next/image";
import ProfileForfaitCard from "./ProfileForfaitCard";
import Button from "../Button";

interface ForfaitServicesProps {
  forfaits: Forfait[];
}

const ForfaitServices: React.FC<ForfaitServicesProps> = ({ forfaits }) => {
  return forfaits.length > 0 ? (
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
  ) : (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/massage-illustration.svg"
        width={100}
        height={100}
        className="mb-4"
        alt="massage illustration zen lounge"
      />
      <h3 className="text-2xl font-bold">Aucun forfait actif pour le moment</h3>
      <p className="text-blue-light text-center">
        Découvrez dès maintenant nos différents forfaits.
      </p>
      <Button
        color="rose"
        href="/forfaits"
        responsiveWidth={{ default: "normal" }}
        compact
      >
        Découvrir les forfaits
      </Button>
    </div>
  );
};

export default ForfaitServices;
