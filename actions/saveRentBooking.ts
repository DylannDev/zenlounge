"use server";

import { db } from "@/firebase/firebase";
import { saveRentBookingSchema } from "@/validation/server/saveRentBookingSchema";
import { collection, addDoc, doc } from "firebase/firestore";
import { z } from "zod";

// ✅ Type de données pour la réservation
export interface RentBookingData {
  serviceName: string;
  dateFrom: string;
  dateTo: string;
  price: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  extraServices: { name: string; quantity: number; price: number }[];
}

export const saveRentBooking = async (bookingData: any, userId?: string) => {
  try {
    // ✅ Validation des données avec Zod
    const validatedData = saveRentBookingSchema.parse(bookingData);

    let bookingRef;
    let docRef;

    if (userId) {
      // 📌 Si l'utilisateur est connecté, sauvegarde dans `clients/{userId}/rentBookings`
      bookingRef = collection(db, "clients", userId, "rentBookings");
      docRef = await addDoc(bookingRef, {
        serviceName: validatedData.serviceName,
        dateFrom: validatedData.dateFrom,
        dateTo: validatedData.dateTo,
        price: validatedData.price,
        extraServices: validatedData.extraServices,
        status: "confirmed",
      });
    } else {
      // 📌 Si l'utilisateur n'est pas connecté, sauvegarde dans `rentBookings`
      bookingRef = collection(db, "rentBookings");
      docRef = await addDoc(bookingRef, {
        ...validatedData,
        status: "confirmed",
      });
    }

    return { success: true, bookingId: docRef.id };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("📌 Erreur de validation Zod :", error.errors);
      return {
        success: false,
        message: "Données invalides.",
        errors: error.errors,
      };
    }

    console.error(
      "📌 Erreur lors de l'enregistrement de la réservation :",
      error
    );
    return {
      success: false,
      message: error.message || "Échec de l'enregistrement.",
    };
  }
};
