import Image from "next/image";
import { PiClock, PiTimer, PiWallet } from "react-icons/pi";
import { formatDate } from "@/lib/utils";
import { massageServices, soinsServices, forfaitSeances } from "@/data";

interface Service {
  id: string;
  serviceName: string;
  price: number;
  date: Date;
  time: string;
  duration: number;
}

// ✅ Fonction pour récupérer l'image correspondant au service
const getServiceImage = (serviceName: string) => {
  // Vérifier dans les massages
  const foundService =
    massageServices.find((service) => service.name === serviceName) ||
    soinsServices.women.find((service) => service.name === serviceName) ||
    soinsServices.men.find((service) => service.name === serviceName) ||
    forfaitSeances.fiveSessions.find(
      (service) => service.name === serviceName
    ) ||
    forfaitSeances.tenSessions.find((service) => service.name === serviceName);

  return foundService?.imageUrl || "/massage-1.jpg";
};

const ProfileServiceCard = ({ service }: { service: Service }) => {
  return (
    <li className="flex gap-4 justify-between border border-rose-dark p-4 rounded-2xl bg-white">
      <div className="flex flex-col gap-6 justify-between">
        <div className="">
          <h3 className="text-xl font-bold">{service.serviceName}</h3>
          <p className="text-sm text-blue-light">{formatDate(service.date)}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-light">
          <p className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-xl text-brown-dark">
              <PiClock />
            </span>{" "}
            {service.time}
          </p>
          <p className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-xl text-brown-dark">
              <PiWallet />
            </span>{" "}
            {service.price} €
          </p>
          <p className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-xl text-brown-dark">
              <PiTimer />
            </span>{" "}
            {service.duration} min
          </p>
        </div>
      </div>

      {/* ✅ Ajout de l'image dynamique */}
      <div className="relative w-full h-full aspect-square max-h-full max-w-[100px] sm:max-h-[130px] sm:max-w-[130px]">
        <Image
          fill
          src={getServiceImage(service.serviceName)}
          alt={`Image de ${service.serviceName} zen lounge`}
          className="object-cover rounded-xl"
        />
      </div>
    </li>
  );
};

export default ProfileServiceCard;
