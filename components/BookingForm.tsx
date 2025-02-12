"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { formFields } from "@/data/BookingForm.config";
import { PiCalendarCheck } from "react-icons/pi";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { initStripePayment } from "@/lib/InitStripePayment";
import { useAuth } from "@/hooks/useAuth";
import { getUserInfos } from "@/actions/getUserInfos";
import { saveBooking } from "@/actions/saveBooking";

interface BookingFormProps {
  service: {
    name: string;
    duration: number;
    price: number;
  };
  selectedDate: Date;
  selectedTime: string;
  setStep: (step: number) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  service,
  selectedDate,
  selectedTime,
  setStep,
  errorMessage,
  setErrorMessage,
}) => {
  const user = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [formData, setFormData] = useState<
    Record<"name" | "email" | "phone", string>
  >({
    name: "",
    email: "",
    phone: "",
  });

  const userInfoFields = [
    { label: "Nom", value: clientInfo?.clientName },
    { label: "Email", value: clientInfo?.clientEmail },
    { label: "Téléphone", value: clientInfo?.clientPhone },
  ];

  // Charger les informations utilisateur si connecté
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleBooking = async () => {
    // ✅ Si l'utilisateur n'est pas connecté, il doit remplir le formulaire
    if (!user?.uid && (!formData.name || !formData.email || !formData.phone)) {
      setErrorMessage("Veuillez remplir tous les champs avant de continuer.");
      return;
    }

    // ✅ Convertir la date en chaîne au format "YYYY-MM-DD"
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const bookingData = {
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      date: selectedDate,
      // date: formattedDate,
      time: selectedTime,
      clientName: clientInfo?.clientName || formData.name,
      clientEmail: clientInfo?.clientEmail || formData.email,
      clientPhone: clientInfo?.clientPhone || formData.phone,
    };

    try {
      setIsLoading(true);
      await saveBooking(bookingData, user?.uid);
      // await initStripePayment(bookingData, user?.uid);
      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setErrorMessage("Une erreur est survenue lors de la réservation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* 📌 Afficher la date sélectionnée */}
      <div className="mb-8">
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
              ? formatDate(selectedDate)
              : "Aucune date sélectionnée"}{" "}
            - {selectedTime || "Aucune heure sélectionnée"}
          </span>
        </button>
      </div>

      {/* 📌 Si l'utilisateur est connecté, on saute le formulaire */}
      <div className="flex flex-col gap-4">
        <h2 id="reservation-form" className="text-xl font-bold">
          Vos informations
        </h2>
        {user?.uid ? (
          <div className="">
            <ul className="flex flex-col gap-2">
              {userInfoFields.map((field, index) => (
                <li key={index} className=" text-blue-light">
                  <span className="font-semibold">{field.label} :</span>{" "}
                  {field.value}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-12">
              <Button button onClick={handleBooking} disabled={isLoading}>
                {isLoading ? "Chargement..." : "Réserver"}
              </Button>
            </div>
          </div>
        ) : (
          // 📌 Affichage du formulaire si l'utilisateur n'est pas connecté
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleBooking();
            }}
            aria-labelledby="reservation-form"
          >
            {formFields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleFormChange}
                  required={field.required}
                  aria-required={field.ariaRequired}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 mt-1 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
                />
                {field.additionalInfo && (
                  <p
                    id={`${field.id}-help`}
                    className="text-sm text-gray-500 mt-1"
                  >
                    {field.additionalInfo}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2 mt-12">
              {/* Message d'erreur */}
              <div>
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>

              <Button button type="submit" disabled={isLoading}>
                {isLoading ? "Chargement..." : "Réserver"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
