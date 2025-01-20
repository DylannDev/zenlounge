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
import { initStripePayment } from "@/lib/InitStripePayment";
// import { useSession } from "next-auth/react";

const ForfaitBooking = () => {
  const params = useParams();
  const slug = params.slug;
  // const router = useRouter();
  // const { data: session } = useSession(); // Vérification de connexion

  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Recherche du forfait correspondant
  const forfait = [
    ...forfaitSeances.fiveSessions,
    ...forfaitSeances.tenSessions,
  ].find((item) => item.slug === slug);

  // Définir le type de forfait
  const forfaitType = forfaitSeances.fiveSessions.some(
    (item) => item.slug === slug
  )
    ? "forfait-5"
    : "forfait-10";

  useEffect(() => {
    // if (!session) {
    //   router.push("/login"); // Redirection si non connecté
    // }

    const loadBookings = async () => {
      try {
        const fetchedBookings = await fetchBookings();
        setBookings(fetchedBookings);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réservations :",
          error
        );
      }
    };

    loadBookings();
  }, []);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Veuillez sélectionner une date et une heure.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handlePayment = async () => {
    if (!forfait) return;

    // Convertir la date en chaîne au format "YYYY-MM-DD"
    const formattedDate = format(selectedDate!, "yyyy-MM-dd");

    const bookingData = {
      serviceName: forfait.name,
      duration: forfait.duration,
      price: forfait.price,
      date: formattedDate,
      time: selectedTime,
      clientName: "Dylann",
      clientEmail: "dxavero@gmail.com",
      clientPhone: "0606545454",
      isForfait: true,
      forfaitType: forfaitType as "forfait-5" | "forfait-10",
    };

    try {
      setIsLoading(true);
      await initStripePayment(bookingData);
      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setErrorMessage("Une erreur est survenue lors de la réservation.");
    } finally {
      setIsLoading(false);
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
        <ServiceDetails service={forfait} />

        {/* Étape 1 : Sélection date & heure */}
        {step === 1 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <h2 className="text-xl font-bold">
              Choisissez votre premier créneau
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
              {/* Message d'erreur */}
              {errorMessage && (
                <p
                  className="text-red-500 text-sm mt-2 text-center"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              <Button button onClick={handleConfirm}>
                Confirmer
              </Button>
            </div>
          </div>
        )}

        {/* Étape 2 : Paiement */}
        {step === 2 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Date et heure sélectionnées</h2>
              <p className="text-sm text-blue-light">
                Votre première séance aura lieu à cette date.
              </p>
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
                    ? formatDate(selectedDate)
                    : "Aucune date sélectionnée"}{" "}
                  - {selectedTime || "Aucune heure sélectionnée"}
                </span>
              </button>
            </div>

            <Button button onClick={handlePayment} disabled={isLoading}>
              {isLoading ? "Chargement..." : "Réserver"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForfaitBooking;
