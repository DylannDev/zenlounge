"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "./Button";
import { formFields } from "@/data/BookingForm.config";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientInfoSchema } from "@/validation/clientInfoForm";
import Loader from "./Loader";
import { useEffect, useState } from "react";

type ClientInfo = z.infer<typeof clientInfoSchema>;

interface DialogClientInfosProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleBooking: () => void;
  clientInfo: ClientInfo;
  setClientInfo: (info: ClientInfo) => void;
}

const DialogClientInfos: React.FC<DialogClientInfosProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleBooking,
  clientInfo,
  setClientInfo,
}) => {
  const [pendingBooking, setPendingBooking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientInfo>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: clientInfo,
  });

  // ✅ Déclencher `handleBooking()` après la mise à jour du `state`
  useEffect(() => {
    if (pendingBooking) {
      handleBooking();
      setPendingBooking(false); // Réinitialiser l'état
    }
  }, [clientInfo, pendingBooking, handleBooking]);

  // ✅ Soumission du formulaire
  const onSubmit = (data: ClientInfo) => {
    setClientInfo(data); // ✅ Mettre à jour le `state`
    setPendingBooking(true); // ✅ Déclencher `handleBooking()` après update
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:p-8 p-6">
        <DialogTitle>Vos informations</DialogTitle>
        <DialogDescription>
          Remplissez vos informations pour finaliser votre réservation.
        </DialogDescription>

        {/* ✅ Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {formFields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                {...register(field.name)}
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message}
                </p>
              )}
              {field.additionalInfo && (
                <p className="text-sm text-blue-light mt-1">
                  {field.additionalInfo}
                </p>
              )}
            </div>
          ))}

          {/* ✅ Bouton de validation */}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} button>
              {isSubmitting ? (
                <Loader text="Réservation en cours..." />
              ) : (
                "Finaliser la réservation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogClientInfos;
