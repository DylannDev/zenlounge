"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiWallet, PiTimer, PiSparkleLight, PiCalendarX } from "react-icons/pi";
import { formatDate } from "@/lib/utils";
import StatusBadge from "../admin/StatusBadge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import SquareButton from "../SquareButton";
import { cancelRentBooking } from "@/actions/cancelRentBookings";

const ProfileRentBookingCard = ({ booking }: { booking: RentBookingData }) => {
  const dateFrom = new Date(booking.dateFrom);
  const dateTo = new Date(booking.dateTo);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCancel = async () => {
    setLoading(true);

    const response = await cancelRentBooking({
      userId: booking.userId,
      bookingId: booking.id!,
      clientEmail: booking.clientEmail,
    });

    if (!response.success) {
      toast({
        title: "Erreur",
        description: response.message,
      });
    } else {
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a bien été annulée.",
      });
      setTimeout(() => {
        router.refresh(); // ✅ Rafraîchir après un léger délai
      }, 500);
    }

    setLoading(false);
    setIsModalOpen(false); // Fermer la modale après l'annulation
  };
  return (
    <li className="flex gap-4 justify-between border border-rose-dark p-4 rounded-2xl bg-white">
      <div className="flex flex-col gap-6 sm:flex-row justify-between items-end w-full">
        {/* ✅ Image dynamique */}
        <div className="flex flex-col sm:flex-row gap-6 w-full h-full">
          <div className="relative w-full aspect-square max-h-[200px] max-w-full sm:max-h-[130px] sm:max-w-[130px]">
            <Image
              src="/lounge-1.jpg"
              alt={`Réservation de ${booking.serviceName}`}
              fill
              sizes="(max-width: 640px) 100vw, 20vw"
              className="object-cover rounded-xl"
            />
          </div>

          {/* ✅ Infos de la réservation */}
          <div className="flex flex-col gap-6 justify-between h-full w-full">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{booking.serviceName}</h3>
              <p className="text-sm text-blue-light">
                {formatDate(booking.dateFrom, false)} -{" "}
                {formatDate(booking.dateTo, false)}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="">
                <StatusBadge status={booking.status || "Confirmé"} />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-light pb-2 sm:pb-0 mt-4">
                {booking.price !== 0 && (
                  <p className="flex items-center gap-1 whitespace-nowrap">
                    <PiWallet className="text-xl text-brown-dark" />
                    {booking.price} €
                  </p>
                )}
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <PiTimer className="text-xl text-brown-dark" />
                  {Math.ceil(
                    (dateTo.getTime() - dateFrom.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  nuits
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <PiSparkleLight className="text-xl text-brown-dark" />{" "}
                  <span>Extras:</span>
                  {booking.extraServices.map((extra, index) => (
                    <span key={index}>
                      {extra.quantity}x {extra.name}
                      {index === booking.extraServices.length - 1 ? "" : ","}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {booking.status === "confirmed" && (
          <>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <SquareButton icon={<PiCalendarX />}>Annuler</SquareButton>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirmer l'annulation</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir annuler cette réservation ? Cette
                  action est irréversible.
                </DialogDescription>
                <DialogFooter className="flex gap-2 sm:gap-1 justify-end">
                  <SquareButton onClick={() => setIsModalOpen(false)}>
                    Annuler
                  </SquareButton>
                  <SquareButton
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    {loading ? "Annulation..." : "Confirmer"}
                  </SquareButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </li>
  );
};

export default ProfileRentBookingCard;
