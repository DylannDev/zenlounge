"use client";

import React, { useState } from "react";
import { massageServices, soinsServices, forfaitSeances } from "@/data";
import { useParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import BookingForm from "@/components/BookingForm";
import ServiceDetails from "@/components/ServiceDetails";
import TimeSelector from "@/components/TimeSelector";
import DateSelector from "@/components/DateSelector";

const BookingPage = () => {
  const params = useParams();
  const slug = params.slug;

  const allServices = [
    ...massageServices,
    ...soinsServices.women,
    ...soinsServices.men,
  ];

  const service = allServices.find((item) => item.slug === slug);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState(1);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }
    setStep(2);
  };

  if (!service) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto flex flex-col pt-10 pb-40">
      <SectionHeader
        title="Réservez votre moment de bien-être"
        subtitle={["Choisissez la date et l'heure de votre prestation"]}
        bigTitle
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 sm:my-20">
        {/* Image et Infos */}
        <ServiceDetails service={service} />

        {/* Étape 1 : Sélection de la date et de l'heure */}
        {step === 1 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <h2 className="text-xl font-bold">Choisissez votre créneau</h2>
            <div className="flex gap-6 my-6">
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <TimeSelector
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
            </div>

            <Button button onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        )}

        {/* Étape 2 : Formulaire de réservation */}
        {step === 2 && (
          <div className="flex flex-col justify-between pt-6 md:pl-10">
            <BookingForm
              service={service}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setStep={setStep}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingPage;
