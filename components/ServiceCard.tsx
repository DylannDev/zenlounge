"use client";

import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { PiTimer, PiWallet } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import SquareButton from "./SquareButton";

interface ServiceCardProps {
  imageUrl: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  buttonText?: string;
  slug: string;
  isForfaitsPage?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  name,
  description,
  duration,
  price,
  buttonText = "Réserver mon moment",
  slug,
  isForfaitsPage = false,
}) => {
  const router = useRouter();
  const user = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = () => {
    if (isForfaitsPage) {
      // ✅ Vérifier si l'utilisateur est connecté avant l'achat d'un forfait
      if (!user?.uid) {
        setIsModalOpen(true);
        return;
      }
      router.push(`/forfaits/${slug}`);
      return;
    }

    router.push(`/reservations/${slug}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-rose-dark h-full">
      <div className="flex flex-col justify-between h-full p-5 gap-5">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative w-full h-full aspect-square max-h-[300px]">
            <Image
              fill
              src={imageUrl}
              alt={`${name} photo`}
              className="object-cover rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div className="w-full h-full pt-5 flex flex-col gap-12 grow justify-between text-sm font-medium">
            {/* Title and Description */}
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-brown-background">
                {name}
              </h3>
              <p className="text-base text-blue-light">{description}</p>
            </div>

            {/* Details */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-between">
              <div className="flex gap-2 text-blue-light">
                {/* Duration */}
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xl text-brown-dark">
                    <PiTimer />
                  </span>
                  <p>{duration} min</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1">
                  <span className="text-xl text-brown-dark">
                    <PiWallet />
                  </span>
                  <span>{price}€</span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                color="rose"
                responsiveWidth={{
                  default: "large",
                  sm: "normal",
                  md: "large",
                  lg: "normal",
                }}
                compact
                button
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Boîte de dialogue pour exiger la connexion avant l'achat d'un forfait */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Connexion requise</DialogTitle>
          <DialogDescription>
            Vous devez être connecté pour l'achat d'un forfait.
          </DialogDescription>
          <DialogFooter className="flex gap-2 sm:gap-1 justify-end">
            <SquareButton onClick={() => setIsModalOpen(false)} variant="white">
              Annuler
            </SquareButton>
            <SquareButton onClick={() => router.push("/login")}>
              Se connecter
            </SquareButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceCard;
