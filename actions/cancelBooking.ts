"use server";

import { db } from "@/firebase/firebase";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  collection,
  updateDoc,
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
    let forfaitId: string | null = null;

    if (userId) {
      // Cas où le client est connecté : Récupérer la réservation
      const bookingRef = doc(db, `clients/${userId}/bookings/${bookingId}`);
      const bookingSnap = await getDoc(bookingRef);

      if (!bookingSnap.exists()) {
        return { success: false, message: "Réservation introuvable." };
      }

      const bookingData = bookingSnap.data();
      forfaitId = bookingData.forfaitId || null;

      // Suppression de la réservation
      await deleteDoc(bookingRef);

      // Si la réservation appartient à un forfait, restituer une séance
      if (forfaitId) {
        const forfaitRef = doc(db, `clients/${userId}/forfaits/${forfaitId}`);
        const forfaitSnap = await getDoc(forfaitRef);

        if (forfaitSnap.exists()) {
          const forfaitData = forfaitSnap.data();
          const newRemainingSessions = Math.min(
            forfaitData.remainingSessions + 1,
            forfaitData.totalSessions
          );

          await updateDoc(forfaitRef, {
            remainingSessions: newRemainingSessions,
          });
        }
      }

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

      let deleted = false;

      for (const docSnap of querySnapshot.docs) {
        if (docSnap.id === bookingId) {
          forfaitId = docSnap.data().forfaitId || null;

          await deleteDoc(doc(db, `bookings/${bookingId}`));
          deleted = true;
          break; // On supprime seulement la réservation concernée
        }
      }

      if (!deleted) {
        return { success: false, message: "Réservation introuvable." };
      }

      return { success: true, message: "Votre réservation a été annulée." };
    }

    throw new Error("Informations insuffisantes pour annuler la réservation.");
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
