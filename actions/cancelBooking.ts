"use server";

import { db } from "@/firebase/firebase";
import {
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

export async function cancelBooking({
  userId,
  bookingId,
  clientEmail,
}: {
  userId: string;
  bookingId: string;
  clientEmail: string;
}) {
  try {
    let forfaitId: string | null = null;
    let serviceId: string | null = null;
    let serviceName: string | null = null;
    let price: number | null = null;
    let duration: number | null = null;
    let deleted = false;

    // 📌 Vérifier dans "clients/{userId}/bookings/{bookingId}"
    const bookingRef = doc(db, `clients/${userId}/bookings/${bookingId}`);
    const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.exists()) {
      const bookingData = bookingSnap.data();
      forfaitId = bookingData.forfaitId || null;
      serviceId = bookingData.serviceId;
      serviceName = bookingData.serviceName;
      price = bookingData.price;
      duration = bookingData.duration;

      // ✅ Supprimer la réservation
      await deleteDoc(bookingRef);
      deleted = true;
    } else {
      // 📌 Vérifier dans "bookings/{bookingId}" (réservations anonymes)
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("clientEmail", "==", clientEmail));
      const querySnapshot = await getDocs(q);

      for (const docSnap of querySnapshot.docs) {
        if (docSnap.id === bookingId) {
          const bookingData = docSnap.data();
          forfaitId = bookingData.forfaitId || null;
          serviceId = bookingData.serviceId;
          serviceName = bookingData.serviceName;
          price = bookingData.price;
          duration = bookingData.duration;

          // ✅ Supprimer la réservation
          await deleteDoc(doc(db, `bookings/${bookingId}`));
          deleted = true;
          break;
        }
      }
    }

    if (!deleted) {
      return { success: false, message: "Réservation introuvable." };
    }

    if (forfaitId) {
      // ✅ Si c'est un forfait, restituer une séance
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
    } else if (serviceName && price !== null) {
      // ✅ Gestion des crédits (clients/{userId}/credits/{serviceId})
      const creditRef = doc(db, `clients/${userId}/credits/${serviceId}`);
      const creditSnap = await getDoc(creditRef);

      if (creditSnap.exists()) {
        // ✅ Mise à jour du crédit existant
        const creditData = creditSnap.data();
        await updateDoc(creditRef, {
          remainingSessions: creditData.remainingSessions + 1,
          totalSessions: creditData.totalSessions + 1,
        });
      } else {
        // ✅ Création d'un nouveau crédit
        await setDoc(creditRef, {
          serviceName,
          remainingSessions: 1,
          totalSessions: 1,
          price,
          duration,
        });
      }
    }

    return { success: true, message: "Votre réservation a été annulée." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
