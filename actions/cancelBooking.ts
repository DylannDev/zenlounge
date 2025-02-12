"use server";

import { db } from "@/firebase/firebase";
import {
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  collection,
} from "firebase/firestore";

export async function cancelBooking({
  userId,
  bookingId,
  clientEmail,
}: {
  userId?: string;
  bookingId: string;
  clientEmail?: string;
}) {
  try {
    if (userId) {
      // Cas où le client est connecté : Suppression dans `/clients/{userId}/bookings/{bookingId}`
      const userBookingRef = doc(db, `clients/${userId}/bookings/${bookingId}`);
      await deleteDoc(userBookingRef);
      return { success: true, message: "Votre réservation a été annulée." };
    } else if (clientEmail) {
      // Cas où le client n'est pas connecté : Recherche par email dans `/bookings/`
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("clientEmail", "==", clientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          success: false,
          message: "Aucune réservation trouvée avec cet email.",
        };
      }

      // Suppression de la réservation correspondante
      const deletePromises = querySnapshot.docs
        .filter((docSnap) => docSnap.id === bookingId)
        .map((docSnap) => deleteDoc(doc(db, `bookings/${docSnap.id}`)));

      if (deletePromises.length === 0) {
        return { success: false, message: "Réservation introuvable." };
      }

      await Promise.all(deletePromises);

      return { success: true, message: "Votre réservation a été annulée." };
    }

    throw new Error("Informations insuffisantes pour annuler la réservation.");
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
