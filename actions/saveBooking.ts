"use server";

import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const saveBooking = async (
  bookingData: BookingDataType,
  userId?: string,
  forfaitId?: string | null,
  useCredit?: Credit
) => {
  try {
    if (!userId) {
      // 📌 Si l'utilisateur n'est pas connecté, enregistrement dans "bookings" global
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        status: "confirmed",
      });
      return { success: true, bookingId: docRef.id };
    }

    const userBookingsRef = collection(db, "clients", userId, "bookings");

    // 📌 Utilisation d'un crédit existant
    if (useCredit) {
      const creditRef = doc(db, `clients/${userId}/credits/${useCredit.id}`);
      const creditSnap = await getDoc(creditRef);

      if (!creditSnap.exists()) {
        throw new Error("Aucun crédit disponible pour cette prestation.");
      }

      const creditData = creditSnap.data();
      if (!creditData || creditData.remainingSessions <= 0) {
        throw new Error("Ce crédit n'a plus de séances disponibles.");
      }

      // 🔥 Décrémenter les séances restantes
      const newRemainingSessions = creditData.remainingSessions - 1;

      if (newRemainingSessions === 0) {
        // 🔥 Supprimer le crédit si aucune séance restante
        await deleteDoc(creditRef);
      } else {
        await updateDoc(creditRef, {
          remainingSessions: newRemainingSessions,
        });
      }

      // 🔥 Ajouter la réservation sous le client
      const docRef = await addDoc(userBookingsRef, {
        serviceName: bookingData.serviceName,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        price: bookingData.price,
        serviceId: bookingData.serviceId,
        forfaitId: null,
        status: "confirmed",
      });

      return { success: true, bookingId: docRef.id };
    }

    // 📌 Si l'utilisateur utilise un forfait
    if (forfaitId) {
      const forfaitRef = doc(db, `clients/${userId}/forfaits/${forfaitId}`);
      let forfaitSnap = await getDoc(forfaitRef);

      if (!forfaitSnap.exists()) {
        const totalSessions = forfaitId.includes("forfait-5") ? 5 : 10;

        await setDoc(forfaitRef, {
          forfaitId,
          totalSessions,
          remainingSessions: totalSessions,
          price: bookingData.price,
          serviceName: bookingData.serviceName,
          createdAt: new Date(),
        });

        forfaitSnap = await getDoc(forfaitRef);
      }

      const forfaitData = forfaitSnap.data();
      if (!forfaitData || forfaitData.remainingSessions <= 0) {
        throw new Error("Ce forfait n'a plus de séances disponibles.");
      }

      // 🔥 Décrémenter les séances restantes
      await updateDoc(forfaitRef, {
        remainingSessions: forfaitData.remainingSessions - 1,
      });

      // 🔥 Ajouter la réservation sous le client
      const docRef = await addDoc(userBookingsRef, {
        serviceName: bookingData.serviceName,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        price: 0, // ✅ Inclus dans un forfait
        forfaitId,
        status: "confirmed",
      });

      return { success: true, bookingId: docRef.id };
    }

    // 📌 Réservation normale (hors forfait et crédit)
    const docRef = await addDoc(userBookingsRef, {
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      price: bookingData.price,
      forfaitId: null,
      status: "confirmed",
    });

    return { success: true, bookingId: docRef.id };
  } catch (e) {
    console.error("Erreur lors de l'enregistrement de la réservation :", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Échec de l'enregistrement.",
    };
  }
};
