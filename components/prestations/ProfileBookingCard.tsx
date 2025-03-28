"use client";

import { useState } from "react";
import Image from "next/image";
import { PiCalendarX, PiTimer, PiWallet } from "react-icons/pi";
import { canCancelBooking, formatDate, getServiceImage } from "@/lib/utils";
import SquareButton from "../SquareButton";
import { cancelBooking } from "@/actions/cancelBooking";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { sendCancellationEmail } from "@/actions/sendCancellationEmail";

interface Service {
  id: string;
  serviceName: string;
  price: number;
  date: Date;
  time: string;
  duration: number;
  forfaitId: string | null;
  userId: string;
  clientEmail: string;
  clientPhone: string;
  clientName: string;
}

const ProfileBookingCard = ({
  service,
  isPastBookings = false,
  onRemove,
}: {
  service: Service;
  isPastBookings?: boolean;
  onRemove?: (id: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCancel = async () => {
    setLoading(true);

    const response = await cancelBooking({
      userId: service.userId,
      bookingId: service.id,
      clientEmail: service.clientEmail,
    });

    if (!response.success) {
      toast({ title: "Erreur", description: response.message });
      console.error(response.message);
    } else {
      // ✅ Envoyer l'email d'annulation
      await sendCancellationEmail({
        clientName: service.clientName,
        clientEmail: service.clientEmail,
        clientPhone: service.clientPhone,
        serviceName: service.serviceName,
        date: formatDate(service.date),
        time: service.time,
        forfaitId: service.forfaitId,
      });

      if (onRemove) {
        onRemove(service.id);
      }

      toast({
        title: "Réservation annulée",
        description:
          "Votre prestation a bien été annulée. Un crédit vous a été attribué pour réserver une nouvelle séance.",
      });

      setTimeout(() => router.refresh(), 500);
    }

    setLoading(false);
    setIsModalOpen(false);
  };

  const showCancelButton = canCancelBooking(service.date);

  return (
    <>
      <li className="flex gap-4 justify-between border border-rose-dark p-4 rounded-2xl bg-white">
        <div className="flex flex-col gap-6 sm:flex-row justify-between items-end w-full">
          {/* ✅ Ajout de l'image dynamique */}
          <div className="flex flex-col sm:flex-row gap-6 w-full h-full">
            <div className="relative w-full h-full aspect-square max-h-[200px] max-w-full sm:max-h-[130px] sm:max-w-[130px]">
              <Image
                fill
                sizes="(max-width: 640px) 100vw, 20vw"
                src={getServiceImage(service.serviceName)}
                alt={`Image de ${service.serviceName} zen lounge`}
                className="object-cover rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-6 justify-between h-full w-full">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{service.serviceName}</h3>
                <p className="text-sm text-blue-light">
                  {formatDate(service.date)} à {service.time}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-light">
                {typeof service.forfaitId === "string" && service.forfaitId && (
                  <div className="flex items-center px-3 py-1 font-semibold bg-rose-dark text-brown-dark rounded-lg w-fit">
                    Forfait
                  </div>
                )}
                {service.price !== 0 && (
                  <p className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-xl text-brown-dark">
                      <PiWallet />
                    </span>{" "}
                    {service.price} €
                  </p>
                )}
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xl text-brown-dark">
                    <PiTimer />
                  </span>{" "}
                  {service.duration} min
                </p>
              </div>
            </div>
          </div>

          {!isPastBookings && !showCancelButton && (
            <>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <SquareButton icon={<PiCalendarX />}>Annuler</SquareButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Confirmer l'annulation</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir annuler cette réservation ? Une
                    annulation ne permet pas de remboursement, mais un crédit
                    vous sera attribué pour reprogrammer une nouvelle séance.
                  </DialogDescription>
                  <DialogFooter className="flex gap-2 sm:gap-1 justify-end">
                    <SquareButton
                      variant="white"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Annuler
                    </SquareButton>
                    <SquareButton onClick={handleCancel} disabled={loading}>
                      {loading ? "Annulation..." : "Confirmer"}
                    </SquareButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default ProfileBookingCard;
