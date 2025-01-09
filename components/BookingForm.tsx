import React, { useState } from "react";
import Button from "@/components/Button";
import { formFields } from "@/data/BookingForm.config";
import { PiCalendarCheck } from "react-icons/pi";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { loadStripe } from "@stripe/stripe-js";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";

// Initialiser Stripe avec la clé publique
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

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
  const [formData, setFormData] = useState<
    Record<"name" | "email" | "phone", string>
  >({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Réinitialiser le message d'erreur lorsque l'utilisateur modifie un champ
  };

  const handleBooking = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Veuillez remplir tous les champs avant de continuer.");
      return;
    }

    // Convertir la date en chaîne au format "YYYY-MM-DD"
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const bookingData = {
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      date: formattedDate,
      time: selectedTime,
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
    };

    try {
      setIsLoading(true);

      // Créer une session de paiement Stripe
      const checkoutSession = await createCheckoutSession(bookingData);

      if (checkoutSession?.success && checkoutSession?.sessionId) {
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe n'a pas pu être initialisé.");

        // Redirection vers Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: checkoutSession.sessionId,
        });

        if (error) {
          throw new Error(`Erreur de redirection : ${error.message}`);
        }
      } else {
        throw new Error(
          checkoutSession?.error ||
            "Erreur lors de la création de la session Stripe."
        );
      }

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
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleBooking();
        }}
        aria-labelledby="reservation-form"
      >
        <h2 id="reservation-form" className="text-xl font-bold">
          Vos informations
        </h2>

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
              className="border border-blue-light/20 rounded-lg px-4 py-2 mt-1 w-full placeholder:text-sm focus:outline-none focus:border-brown-light"
            />
            {field.additionalInfo && (
              <p id={`${field.id}-help`} className="text-sm text-gray-500 mt-1">
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
    </div>
  );
};

export default BookingForm;
