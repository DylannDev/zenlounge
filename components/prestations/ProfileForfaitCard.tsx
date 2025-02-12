import Image from "next/image";
import { PiWallet, PiCalendarCheck } from "react-icons/pi";
import { getServiceImage } from "@/lib/utils";
import SquareButton from "../SquareButton";

interface Forfait {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
}

const ProfileForfaitCard = ({ forfait }: { forfait: Forfait }) => {
  return (
    <li className="flex gap-4 border border-rose-dark p-4 rounded-2xl bg-white">
      <div className="flex flex-col gap-6 sm:flex-row justify-between items-end w-full">
        {/* ✅ Image dynamique du forfait */}
        <div className="flex flex-col sm:flex-row gap-6 w-full h-full">
          <div className="relative w-full h-full aspect-square max-h-[200px] max-w-full sm:max-h-[130px] sm:max-w-[130px]">
            <Image
              fill
              src={getServiceImage(forfait.serviceName)}
              alt={`Image de ${forfait.serviceName} Zen Lounge`}
              className="object-cover rounded-xl"
            />
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-6 justify-between h-full w-full">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{forfait.serviceName}</h3>
              <p className="text-blue-light text-sm">
                {forfait.remainingSessions} / {forfait.totalSessions} séances
                restantes
              </p>
            </div>

            <div className="text-blue-light text-sm flex items-center gap-2">
              <div className="flex items-center px-3 py-1 font-semibold bg-rose-dark text-brown-dark rounded-lg w-fit">
                {forfait.id.includes("forfait-5")
                  ? "Forfait 5 séances"
                  : "Forfait 10 séances"}
              </div>
              <p className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl text-brown-dark">
                  <PiWallet />
                </span>{" "}
                {forfait.price} €
              </p>
            </div>
          </div>
        </div>

        <SquareButton icon={<PiCalendarCheck />}>
          Réserver ma séance
        </SquareButton>
      </div>
    </li>
  );
};

export default ProfileForfaitCard;
