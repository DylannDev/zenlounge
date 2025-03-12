"use client";

import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Button from "./Button";
import DialogClientInfos from "./DialogClientInfos";
import {
  PiFlowerLotusLight,
  PiSparkleLight,
  PiAvocadoLight,
  PiHamburgerLight,
} from "react-icons/pi";
import { roomDetails } from "@/data";
import { DateSelection } from "./DateSelection";
import { ExtraServicesSelection } from "./ExtraServicesSelection";
import { saveRentBooking } from "@/actions/saveRentBooking";
import { format } from "date-fns";

const RentBookingCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookingValid, setIsBookingValid] = useState(true);
  const { toast } = useToast();
  const user = useAuth();

  // ✅ Infos client (seulement si l'utilisateur n'est pas connecté)
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ✅ Extras
  const [extraServices, setExtraServices] = useState<ExtraService[]>([
    { name: "Massage", price: 80, icon: <PiFlowerLotusLight />, quantity: 0 },
    { name: "Massage Duo", price: 150, icon: <PiSparkleLight />, quantity: 0 },
    { name: "Brunch", price: 20, icon: <PiAvocadoLight />, quantity: 0 },
    { name: "Repas", price: 30, icon: <PiHamburgerLight />, quantity: 0 },
  ]);

  const roomPricePerNight = 120;

  // ✅ Sérialisation des extras sans `icon`
  const serializedExtraServices = extraServices
    .filter((s) => s.quantity > 0)
    .map(({ name, price, quantity }) => ({ name, price, quantity }));

  // ✅ Calcul des nuits
  const calculateNights = () => {
    if (selectedDate?.from && selectedDate?.to) {
      return Math.ceil(
        (selectedDate.to.getTime() - selectedDate.from.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }
    return 1;
  };

  // ✅ Calcul du prix total
  const totalPrice =
    roomPricePerNight * calculateNights() +
    extraServices.reduce((sum, extra) => sum + extra.price * extra.quantity, 0);

  // ✅ Gestion de la réservation
  const handleBooking = async () => {
    if (!selectedDate?.from || !selectedDate?.to) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner des dates.",
      });
      return;
    }

    // ✅ Si l'utilisateur n'est pas connecté, ouvrir la modale pour renseigner ses informations
    if (
      !user?.uid &&
      (!clientInfo.name || !clientInfo.email || !clientInfo.phone)
    ) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);

    // ✅ Convertir la date en format correct
    // const formattedDateFrom = format(selectedDate.from, "yyyy-MM-dd");
    // const formattedDateTo = format(selectedDate.to, "yyyy-MM-dd");

    // ✅ Construire l'objet bookingData
    const bookingData = {
      serviceName: "Serenity Suite",
      // dateFrom: formattedDateFrom,
      // dateTo: formattedDateTo,
      dateFrom: selectedDate.from,
      dateTo: selectedDate.to,
      price: totalPrice,
      extraServices: serializedExtraServices,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      clientPhone: clientInfo.phone,
    };

    try {
      // 🚀 Appeler la server action pour sauvegarder la réservation
      const rentBooking = await saveRentBooking(bookingData, user?.uid);

      if (rentBooking.success) {
        toast({
          title: "Séjour réservé",
          description: "Votre séjour a été réservé avec succès.",
        });
      } else {
        toast({
          title: "Erreur",
          description: rentBooking.message || "Une erreur est survenue.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-rose-dark p-5 md:p-8 w-full">
      <h2 className="text-2xl font-bold">Serenity Suite</h2>
      <ul className="grid grid-cols-2 gap-4 text-blue-light py-5">
        {roomDetails.map((detail, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-xl text-orange">{detail.icon}</span>
            <span className="text-sm">{detail.value}</span>
          </li>
        ))}
      </ul>

      <DateSelection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        roomPricePerNight={roomPricePerNight}
        setIsBookingValid={setIsBookingValid}
      />

      <ExtraServicesSelection
        extraServices={extraServices}
        setExtraServices={setExtraServices}
      />

      <div className="my-6 border-t pt-5">
        <p className="text-lg font-semibold flex justify-between">
          <span>Prix total :</span>
          <span className="font-bold">
            {!selectedDate?.to ? 0 : totalPrice}€
          </span>
        </p>
      </div>

      <Button
        onClick={handleBooking}
        disabled={!isBookingValid || isLoading}
        button
      >
        {isLoading ? "Chargement..." : "Réserver maintenant"}
      </Button>

      <DialogClientInfos
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleBooking={handleBooking}
        clientInfo={clientInfo}
        setClientInfo={setClientInfo}
      />
    </div>
  );
};

export default RentBookingCard;
