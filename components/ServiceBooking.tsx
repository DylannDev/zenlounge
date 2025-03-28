"use client";

import React, { useEffect, useState } from "react";
import { massageServices, soinsServices } from "@/data";
import { notFound, useParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import BookingForm from "@/components/BookingForm";
import ServiceDetails from "@/components/ServiceDetails";
import TimeSelector from "@/components/TimeSelector";
import DateSelector from "@/components/DateSelector";
import { fetchBookings } from "@/actions/fetchBookings";

const ServiceBooking: React.FC<ServiceBookingProps> = ({ credits = [] }) => {
  const params = useParams();
  const slug = params.slug as string; // ✅ Vérification du slug

  const allServices = [
    ...massageServices,
    ...soinsServices.women,
    ...soinsServices.men,
  ];

  const service = allServices.find((item) => item.slug === slug);

  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [step, setStep] = useState(1);

  // ✅ Vérification et recherche du crédit actif
  const activeCredit = credits.find(
    (credit) => credit.id === slug && credit.remainingSessions > 0
  );

  // Charger les réservations au montage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const fetchedBookings = await fetchBookings("confirmed");
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

  if (!service) {
    return notFound();
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto flex flex-col pt-10 pb-20">
      <SectionHeader
        title="Réservez votre moment de bien-être"
        subtitle={["Choisissez la date et l'heure de votre prestation"]}
        bigTitle
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 sm:my-20">
        {/* Image et Infos */}
        <ServiceDetails service={service} activeCredit={activeCredit} />

        {/* Étape 1 : Sélection de la date et de l'heure */}
        {step === 1 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <h2 className="text-xl font-bold">
              {activeCredit
                ? "Programmer une nouvelle séance"
                : "Choisissez votre créneau"}
            </h2>
            <div className="flex flex-col min-[500px]:flex-row gap-6 my-6">
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <TimeSelector
                selectedDate={selectedDate}
                serviceDuration={service.duration}
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

        {/* Étape 2 : Formulaire de réservation */}
        {step === 2 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <BookingForm
              service={service}
              selectedDate={selectedDate!}
              selectedTime={selectedTime}
              setStep={setStep}
              setErrorMessage={setErrorMessage}
              activeCredit={activeCredit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceBooking;
