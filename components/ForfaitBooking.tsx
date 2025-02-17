"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { forfaitSeances } from "@/data";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import ServiceDetails from "@/components/ServiceDetails";
import TimeSelector from "@/components/TimeSelector";
import DateSelector from "@/components/DateSelector";
import { fetchBookings } from "@/actions/fetchBookings";
import { PiCalendarCheck } from "react-icons/pi";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { initStripePayment } from "@/lib/InitStripePayment";
import { saveBooking } from "@/actions/saveBooking";
import { getUserBookings } from "@/actions/getUserBookings";
import { getUserInfos } from "@/actions/getUserInfos";
import { toast } from "@/hooks/use-toast";

// ✅ Modification de `ForfaitBookingProps` pour exclure `createdAt`
interface Forfait {
  forfaits: {
    id: string;
    serviceName: string;
    remainingSessions: number;
    totalSessions: number;
    price: number;
    createdAt: Date;
  }[];
}

const ForfaitBooking: React.FC<Forfait> = ({ forfaits }) => {
  const user = useAuth();
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  // ✅ Vérifier si l'utilisateur a un forfait actif
  const activeForfait = forfaits.find(
    (forfait: any) => forfait.id === slug && forfait.remainingSessions > 0
  );

  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<{
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  } | null>(null);

  const userInfoFields = [
    { label: "Nom", value: clientInfo?.clientName },
    { label: "Email", value: clientInfo?.clientEmail },
    { label: "Téléphone", value: clientInfo?.clientPhone },
  ];

  // 📌 Recherche du forfait correspondant
  const forfait = [
    ...forfaitSeances.fiveSessions,
    ...forfaitSeances.tenSessions,
  ].find((item) => item.slug === slug);

  // 📌 Déterminer le type de forfait et générer forfaitId
  const forfaitType = forfaitSeances.fiveSessions.some(
    (item) => item.slug === slug
  )
    ? "forfait-5"
    : "forfait-10";

  // 📌 Charger les données nécessaires
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedBookings = await fetchBookings();
        setBookings(fetchedBookings);

        if (user?.uid) {
          const clientData = await getUserInfos(user.uid);
          setClientInfo(clientData);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    loadData();
  }, [user?.uid]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Veuillez sélectionner une date et une heure.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handlePayment = async () => {
    if (!forfait || !clientInfo || !user?.uid) {
      setErrorMessage(
        "Impossible de procéder à la réservation. Informations manquantes."
      );
      return;
    }

    // ✅ Convertir la date en format "YYYY-MM-DD"
    const formattedDate = format(selectedDate!, "yyyy-MM-dd");

    const bookingData = {
      serviceName: forfait.name,
      duration: forfait.duration,
      price: activeForfait ? 0 : forfait.price,
      date: selectedDate!,
      // date: formattedDate,
      time: selectedTime,
      clientName: clientInfo.clientName,
      clientEmail: clientInfo.clientEmail,
      clientPhone: clientInfo.clientPhone,
      isForfait: true,
      forfaitType: forfaitType as "forfait-5" | "forfait-10",
    };

    try {
      setIsLoading(true);

      if (activeForfait) {
        // ✅ Utilisation du forfait (pas de paiement Stripe)
        await saveBooking(bookingData, user.uid, activeForfait.id);
        toast({
          title: "Séance réservée",
          description: "✅ Votre séance a été réservée.",
        });
        router.push("/prestations");
      } else {
        // ✅ Paiement normal via Stripe
        // await initStripePayment(bookingData, user.uid, slug);
        await saveBooking(bookingData, user.uid, slug);
      }

      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setErrorMessage("Une erreur est survenue lors de la réservation.");
    } finally {
      if (!activeForfait) {
        setIsLoading(false);
      }
    }
  };

  if (!forfait) {
    return notFound();
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto flex flex-col pt-10 pb-40">
      <SectionHeader
        title="Réservez votre forfait"
        subtitle={["Sélectionnez la date et l'heure de votre première séance"]}
        bigTitle
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 sm:my-20">
        {/* Détails du forfait */}
        <ServiceDetails service={forfait} activeForfait={activeForfait} />

        {/* Étape 1 : Sélection date & heure */}
        {step === 1 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <h2 className="text-xl font-bold">
              {activeForfait
                ? "Réserver une séance inlcue dans votre forfait"
                : "Choisissez votre premier créneau"}
            </h2>
            <div className="flex gap-6 my-6">
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <TimeSelector
                selectedDate={selectedDate}
                serviceDuration={forfait.duration}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                bookings={bookings}
              />
            </div>

            <div className="flex flex-col gap-2">
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errorMessage}
                </p>
              )}
              <Button button onClick={handleConfirm}>
                Confirmer
              </Button>
            </div>
          </div>
        )}

        {/* Étape 2 : Confirmation */}
        {step === 2 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Date et heure sélectionnées</h2>
              <p className="text-sm text-blue-light">
                {activeForfait
                  ? "Votre prochaine séance aura lieu à cette date."
                  : "Votre première séance aura lieu à cette date."}
              </p>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 w-fit px-3 py-2 text-sm border border-blue-light/20 rounded-md bg-white text-blue-light focus:outline-none"
              >
                <PiCalendarCheck className="text-lg text-orange" />
                <span>
                  {formatDate(selectedDate!)} - {selectedTime}
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h2 id="reservation-form" className="text-xl font-bold">
                Vos informations
              </h2>
              <ul className="flex flex-col gap-2">
                {userInfoFields.map((field, index) => (
                  <li key={index} className=" text-blue-light">
                    <span className="font-semibold">{field.label} :</span>{" "}
                    {field.value}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 mt-12">
                <Button button onClick={handlePayment} disabled={isLoading}>
                  {isLoading ? "Réservation en cours..." : "Réserver"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForfaitBooking;
