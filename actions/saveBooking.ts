"use server";

import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const saveBooking = async (
  bookingData: BookingDataType,
  userId?: string,
  forfaitId?: string
) => {
  try {
    // 📌 Si l'utilisateur est connecté
    if (userId) {
      const userBookingsRef = collection(db, "clients", userId, "bookings");

      // ✅ Vérification et création du forfait si applicable
      if (forfaitId) {
        const forfaitRef = doc(db, "clients", userId, "forfaits", forfaitId);
        let forfaitSnap = await getDoc(forfaitRef);

        // 🟡 Si le forfait n'existe pas, on le crée !
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

          forfaitSnap = await getDoc(forfaitRef); // Récupérer les nouvelles données
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
          price: 0, // ✅ Gratuit car inclus dans un forfait
          forfaitId, // ✅ Lier la réservation au forfait
          status: "confirmed",
        });

        return { success: true, bookingId: docRef.id };
      }

      // ✅ Réservation normale (hors forfait)
      const docRef = await addDoc(userBookingsRef, {
        serviceName: bookingData.serviceName,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        price: bookingData.price,
        forfaitId: null, // Pas de forfait utilisé
        status: "confirmed",
      });

      return { success: true, bookingId: docRef.id };
    }

    // 📌 Si l'utilisateur n'est pas connecté, enregistrement global dans "bookings"
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
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
