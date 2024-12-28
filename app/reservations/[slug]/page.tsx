"use client";

import React, { useState } from "react";
import Image from "next/image";
import { massageServices, soinsServices, forfaitSeances } from "@/data";
import { useParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import { PiTimer, PiWallet } from "react-icons/pi";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
const ReservationPage = () => {
  const params = useParams();
  const slug = params.slug;

  const allServices = [
    ...massageServices,
    ...soinsServices.women,
    ...soinsServices.men,
    // ...forfaitSeances.fiveSessions,
    // ...forfaitSeances.tenSessions,
  ];

  const service = allServices.find((item) => item.slug === slug);

  // États pour la sélection
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Liste des créneaux horaires disponibles
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
    "6:30 PM",
  ];

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }

    console.log("Date :", selectedDate.toDateString());
    console.log("Heure :", selectedTime);
    alert("Votre réservation a été confirmée !");
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 sm:my-20">
        {/* Image et Infos */}

        <div className="relative aspect-square w-full">
          <Image
            fill
            src={service.imageUrl}
            alt={service.name}
            className="object-cover rounded-3xl"
          />

          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 rounded-xl text-white bg-brown-background/40 backdrop-blur-xl w-full">
              <h1 className="text-4xl font-bold">{service.name}</h1>
              <p className="text-lg mt-2">{service.description}</p>
              <div className="flex flex-col md:flex-row gap-2 mt-4">
                {/* Duration */}
                <div className="flex items-center gap-1">
                  <span className="text-2xl text-rose-dark">
                    <PiTimer />
                  </span>
                  <p>{service.duration}</p>
                </div>
                <span className="text-xl">|</span>
                {/* Price */}
                <div className="flex items-center gap-1">
                  <span className="text-2xl text-rose-dark">
                    <PiWallet />
                  </span>
                  <p>{service.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sélection de la date et de l'heure */}
        <div className="w-full pt-6 md:pl-10">
          <h2 className="text-xl font-bold mb-4">
            Choisissez votre date et heure
          </h2>
          {/* Sélection de la date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              locale={fr}
              className="rounded-xl border border-rose-dark cur"
              numberOfMonths={2}
              formatters={{
                formatWeekdayName: (weekday, options) =>
                  weekday
                    .toLocaleDateString("fr-FR", { weekday: "short" })
                    .replace(".", "")
                    .replace(/^\w/, (c) => c.toUpperCase()),
              }}
            />
          </div>

          {/* Sélection de l'heure */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            >
              <option value="" disabled>
                Sélectionnez une heure
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton de réservation */}
          <Button onClick={handleReservation}>Réserver maintenant</Button>
        </div>
      </div>
    </section>
  );
};

export default ReservationPage;
