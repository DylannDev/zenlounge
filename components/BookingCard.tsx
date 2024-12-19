"use client";

import React, { ReactNode, useState } from "react";
import Counter from "./Counter";
import { roomDetails } from "@/data";
import Button from "./Button";
import {
  PiAvocadoLight,
  PiFlowerLotusLight,
  PiHamburgerLight,
  PiSparkleLight,
} from "react-icons/pi";

interface ExtraService {
  name: string;
  price: number;
  icon: ReactNode;
  quantity: number; // Ajout d'une clé pour suivre la quantité sélectionnée
}

const BookingCard: React.FC = () => {
  const [nights, setNights] = useState(1);
  const [extraServices, setExtraServices] = useState<ExtraService[]>([
    { name: "Massage", price: 50, icon: <PiFlowerLotusLight />, quantity: 0 },
    {
      name: "Soin Visage",
      price: 40,
      icon: <PiSparkleLight />,
      quantity: 0,
    },
    { name: "Brunch", price: 20, icon: <PiAvocadoLight />, quantity: 0 },
    { name: "Repas", price: 30, icon: <PiHamburgerLight />, quantity: 0 },
  ]);

  const roomPricePerNight = 120;

  // Fonction pour ajuster la quantité d'une prestation
  const updateServiceQuantity = (name: string, increment: boolean) => {
    setExtraServices((prev) =>
      prev.map((service) =>
        service.name === name
          ? {
              ...service,
              quantity: increment
                ? service.quantity + 1
                : Math.max(service.quantity - 1, 0), // Empêche une quantité négative
            }
          : service
      )
    );
  };

  // Calcul du prix total
  const totalPrice =
    roomPricePerNight * nights +
    extraServices.reduce((sum, extra) => sum + extra.price * extra.quantity, 0);

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-rose-dark p-5 md:p-8 w-full ">
      {/* Room Info */}
      <h2 className="text-2xl font-bold">Serenity Suite</h2>
      <ul className="grid grid-cols-2 gap-4 text-blue-light py-5">
        {roomDetails.map((detail, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-xl text-orange">{detail.icon}</span>
            <span className="text-sm">{detail.value}</span>
          </li>
        ))}
      </ul>

      {/* Per Night Price */}
      <div className="flex flex-col gap-2 border-t border-b py-5">
        <div className="">
          <p className="flex items-center justify-between font-medium">
            <span>Prix par nuit : </span>
            <span className="font-bold text-lg">{roomPricePerNight}€</span>
          </p>
        </div>

        {/* Nights Counter */}
        <div className="flex items-center justify-between">
          <p className="font-medium">Nombre de nuits :</p>
          <Counter
            value={nights}
            onIncrement={() => setNights((prev) => prev + 1)}
            onDecrement={() => setNights((prev) => Math.max(prev - 1, 1))} // Minimum 1 nuit
            minValue={1}
          />
        </div>
      </div>

      {/* Extra Services */}
      <div className="">
        <h3 className="text-xl font-bold my-5">Extras</h3>
        <ul className="flex flex-col gap-2">
          {extraServices.map((service) => (
            <li
              key={service.name}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2 text-xl items-center">
                <span className="text-orange text-xl">{service.icon}</span>
                <div className="text-sm text-blue-light">
                  <span>
                    {service.name} : {service.price}€
                  </span>
                </div>
              </div>
              <Counter
                value={service.quantity}
                onIncrement={() => updateServiceQuantity(service.name, true)}
                onDecrement={() => updateServiceQuantity(service.name, false)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <div className="my-6 border-t pt-5">
        <p className="text-lg font-medium flex justify-between">
          <span>Prix total :</span>{" "}
          <span className="font-bold">{totalPrice}€</span>
        </p>
      </div>

      {/* Booking Button */}
      <Button>Réserver maintenant</Button>
    </div>
  );
};

export default BookingCard;
