"use client";

import React, { useEffect, useState } from "react";
import { PiCalendarCheck } from "react-icons/pi";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getUserInfos } from "@/actions/getUserInfos";
import { toast } from "@/hooks/use-toast";
import { saveBooking } from "@/actions/saveBooking";
import UserInfoDisplay from "./UserInfoDisplay";
import BookingFormFields from "./BookingFormFields";
import GeneralInformations from "./GeneralInformations";

const BookingForm: React.FC<BookingFormProps> = ({
  service,
  selectedDate,
  selectedTime,
  setStep,
  setErrorMessage,
  activeCredit,
}) => {
  const user = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  useEffect(() => {
    if (user?.uid) {
      const loadUserInfo = async () => {
        try {
          const data = await getUserInfos(user.uid);
          setClientInfo({
            clientName: data?.clientName || "",
            clientEmail: data?.clientEmail || "",
            clientPhone: data?.clientPhone || "",
          });
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des infos utilisateur:",
            error
          );
        }
      };
      loadUserInfo();
    }
  }, [user?.uid]);

  const handleBooking = async (formData: any) => {
    // const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const bookingData = {
      serviceId: service.slug,
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      date: selectedDate,
      time: selectedTime,
      clientName: clientInfo?.clientName || formData.name,
      clientEmail: clientInfo?.clientEmail || formData.email,
      clientPhone: clientInfo?.clientPhone || formData.phone,
    };

    try {
      setIsLoading(true);

      if (activeCredit) {
        await saveBooking(bookingData, user?.uid, null, activeCredit);
        toast({
          title: "Séance réservée",
          description: "✅ Votre séance a été réservée.",
        });
        router.push("/prestations");
      } else {
        await saveBooking(bookingData);
        toast({
          title: "Séance réservée",
          description: "✅ Votre séance a été réservée.",
        });
      }
      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setErrorMessage("Une erreur est survenue lors de la réservation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-between h-full">
      {/* 📌 Afficher la date sélectionnée */}
      <div className="">
        <h2 className="text-xl font-bold mb-4">Date et heure sélectionnées</h2>
        <button
          onClick={() => {
            setStep(1);
            setErrorMessage("");
          }}
          className="flex items-center gap-2 w-fit px-3 py-2 text-sm rounded-md border border-blue-light/20 bg-white text-blue-light focus:outline-none"
        >
          <PiCalendarCheck className="text-lg text-orange" />
          <span>
            {selectedDate
              ? format(selectedDate, "PP")
              : "Aucune date sélectionnée"}{" "}
            - {selectedTime || "Aucune heure sélectionnée"}
          </span>
        </button>
      </div>

      {/* 📌 Informations générales */}
      <GeneralInformations isBookingSimple />

      {/* 📌 Si l'utilisateur est connecté, on saute le formulaire */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Vos informations</h2>
        {user?.uid ? (
          <UserInfoDisplay
            clientInfo={clientInfo}
            handleBooking={handleBooking}
            isLoading={isLoading}
          />
        ) : (
          <BookingFormFields handleBooking={handleBooking} />
        )}
      </div>
    </div>
  );
};

export default BookingForm;
