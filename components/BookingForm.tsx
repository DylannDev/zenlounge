import React, { useState } from "react";
import Button from "@/components/Button";
import { formFields } from "@/data/BookingForm.config";
import { PiCalendarCheck } from "react-icons/pi";
import { saveBooking } from "@/actions/saveBooking";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/actions/sendEmail";

interface BookingFormProps {
  service: {
    name: string;
    duration: number;
    price: number;
  };
  selectedDate: Date | undefined;
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
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Réinitialiser le message d'erreur lorsque l'utilisateur modifie un champ
  };

  const handleBooking = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Veuillez remplir tous les champs avant de continuer.");
      return;
    }

    const bookingData = {
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      date: selectedDate,
      time: selectedTime,
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
    };

    try {
      await saveBooking(bookingData);
      await sendEmail(bookingData);
      setErrorMessage("");

      router.push("/success");
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la réservation.");
      console.log(error);
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
              ? selectedDate.toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
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
              // pattern={field.pattern || undefined}
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

          <Button button type="submit">
            Réserver
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
