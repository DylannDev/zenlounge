"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/validation/bookingSchema";
import { formFields } from "@/data/BookingForm.config";
import Button from "@/components/Button";

interface BookingFormFieldsProps {
  handleBooking: (data: any) => Promise<void>;
}

const BookingFormFields: React.FC<BookingFormFieldsProps> = ({
  handleBooking,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleBooking)}
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
            {...register(field.name)}
            type={field.type}
            placeholder={field.placeholder}
            className="border border-blue-light/20 rounded-lg px-4 py-2 mt-1 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}

      {/* Bouton de soumission */}
      <div className="flex flex-col gap-2 mt-12">
        <Button button type="submit">
          Réserver
        </Button>
      </div>
    </form>
  );
};

export default BookingFormFields;
