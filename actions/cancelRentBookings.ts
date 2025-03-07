"use server";

import { db } from "@/firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function cancelRentBooking({
  userId,
  bookingId,
  clientEmail,
}: {
  userId?: string;
  bookingId: string;
  clientEmail?: string;
}) {
  try {
    let updated = false;

    // 📌 Vérifier si la réservation est liée à un utilisateur connecté
    if (userId) {
      const bookingRef = doc(db, `clients/${userId}/rentBookings/${bookingId}`);
      const bookingSnap = await getDoc(bookingRef);

      if (bookingSnap.exists()) {
        // ✅ Mettre à jour le statut de la réservation
        await updateDoc(bookingRef, { status: "cancelled" });
        updated = true;
      }
    }

    // 📌 Vérifier si la réservation est anonyme (faite sans compte)
    if (!updated && clientEmail) {
      const bookingsRef = collection(db, "rentBookings");
      const q = query(bookingsRef, where("clientEmail", "==", clientEmail));
      const querySnapshot = await getDocs(q);

      for (const docSnap of querySnapshot.docs) {
        if (docSnap.id === bookingId) {
          // ✅ Mettre à jour le statut de la réservation
          await updateDoc(doc(db, `rentBookings/${bookingId}`), {
            status: "cancelled",
          });
          updated = true;
          break;
        }
      }
    }

    if (!updated) {
      return { success: false, message: "Réservation introuvable." };
    }

    return { success: true, message: "Votre réservation a été annulée." };
  } catch (error: any) {
    console.error("🚨 Erreur lors de l'annulation de la réservation :", error);
    return {
      success: false,
      message: error.message || "Une erreur est survenue.",
    };
  }
}
