"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiWallet, PiCalendarCheck, PiTimer } from "react-icons/pi";
import { getServiceImage } from "@/lib/utils";
import SquareButton from "../SquareButton";
import { formatDate } from "../../lib/utils";

const ProfileCreditCard: React.FC<ProfileCreditCardProps> = ({ credit }) => {
  const router = useRouter();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiresAt = new Date(credit.expiresAt);
  expiresAt.setHours(0, 0, 0, 0);

  const isExpired = expiresAt < today;

  // ✅ Gestion de la redirection vers la page de réservation avec crédit
  const handleRedirect = () => {
    router.push(`/reservations/${credit.id}`);
  };

  return (
    <li className="flex gap-4 border border-rose-dark p-4 rounded-2xl bg-white">
      <div className="flex flex-col gap-6 sm:flex-row justify-between items-end w-full">
        {/* ✅ Image dynamique */}
        <div className="flex flex-col sm:flex-row gap-6 w-full h-full">
          <div className="relative w-full h-full aspect-square max-h-[200px] max-w-full sm:max-h-[130px] sm:max-w-[130px]">
            <Image
              fill
              sizes="(max-width: 640px) 100vw, 20vw"
              src={getServiceImage(credit.serviceName)}
              alt={`Image de ${credit.serviceName} Zen Lounge`}
              className="object-cover rounded-xl"
            />
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-6 justify-between h-full w-full text-blue-light">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{credit.serviceName}</h3>
              <p className="text-sm">
                {credit.remainingSessions} / {credit.totalSessions} crédit
                restant
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {isExpired ? (
                <p className="text-sm text-red-500">Crédit expiré</p>
              ) : (
                <p className="text-sm">
                  Votre crédit expire le : {formatDate(expiresAt, false)}
                </p>
              )}
              <div className="text-sm flex flex-wrap items-center gap-2">
                <div className="flex items-center px-3 py-1 font-semibold bg-rose-dark text-brown-dark rounded-lg w-fit">
                  Crédit
                </div>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xl text-brown-dark">
                    <PiWallet />
                  </span>{" "}
                  {credit.price} €
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xl text-brown-dark">
                    <PiTimer />
                  </span>{" "}
                  {credit.duration} min
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isExpired && (
          <SquareButton icon={<PiCalendarCheck />} onClick={handleRedirect}>
            Réserver ma séance
          </SquareButton>
        )}
      </div>
    </li>
  );
};

export default ProfileCreditCard;
