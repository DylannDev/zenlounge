"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Button";
import ProfileBookingCard from "./ProfileBookingCard";

const UpcomingServices = ({ services }: { services: any[] }) => {
  const [activeBookings, setActiveBookings] = useState(
    services.filter((service) => service.status === "confirmed")
  );

  // Fonction de suppression
  const handleCancelBookings = (bookingId: string) => {
    setActiveBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );
  };

  // Synchroniser `activeBookings` si `services` change
  useEffect(() => {
    setActiveBookings(
      services.filter((service) => service.status === "confirmed")
    );
  }, [services]);

  return (
    <>
      {activeBookings.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/massage-illustration.svg"
            width={100}
            height={100}
            className="mb-4"
            alt="massage illustration zen lounge"
          />
          <h3 className="text-2xl font-bold">Aucune prestation à venir</h3>
          <p className="text-blue-light text-center">
            Vous n'avez pas encore de rendez-vous programmés. Réservez dès
            maintenant votre prochaine prestation.
          </p>
          <Button
            color="rose"
            href="/massages"
            responsiveWidth={{ default: "normal" }}
            compact
          >
            Découvrir les prestations
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Prochaines Prestations</h2>
          <ul className="space-y-4">
            {activeBookings.map((service) => (
              <ProfileBookingCard
                key={service.id}
                service={service}
                onRemove={handleCancelBookings}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UpcomingServices;
