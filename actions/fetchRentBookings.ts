"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { convertFirebaseTimestamp } from "@/lib/utils";

// ✅ Fonction pour récupérer les réservations
export const fetchRentBookings = async (): Promise<RentBookingData[]> => {
  try {
    let allRentBookings: RentBookingData[] = [];

    // 📌 1. Récupération des réservations anonymes depuis `rentBookings`
    try {
      const rentBookingsRef = collection(db, "rentBookings");
      const rentBookingsSnap = await getDocs(rentBookingsRef);

      rentBookingsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.dateFrom || !data.dateTo) return;

        allRentBookings.push({
          id: docSnap.id,
          serviceName: data.serviceName,
          dateFrom: convertFirebaseTimestamp(data.dateFrom),
          dateTo: convertFirebaseTimestamp(data.dateTo),
          price: data.price,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientPhone: data.clientPhone,
          extraServices: data.extraServices,
          status: data.status,
        });
      });
    } catch (error) {
      console.error(
        "🚨 Erreur lors de la récupération des rentBookings :",
        error
      );
    }

    // 📌 2. Récupération des réservations des clients connectés
    try {
      const clientsRef = collection(db, "clients");
      const clientsSnap = await getDocs(clientsRef);

      for (const clientDoc of clientsSnap.docs) {
        const userId = clientDoc.id;

        // ✅ Récupérer les infos client depuis `clients/{userId}`
        const clientData = clientDoc.data();
        const clientName = `${clientData.firstName} ${clientData.lastName}`;
        const clientEmail = clientData.email;
        const clientPhone = clientData.phone;

        // ✅ Vérifier si `clients/{userId}/rentBookings` contient des documents
        const userRentBookingsRef = collection(
          db,
          `clients/${userId}/rentBookings`
        );
        const userRentBookingsSnap = await getDocs(userRentBookingsRef);

        if (userRentBookingsSnap.empty) {
          continue; // 🔥 S'il n'y a aucune réservation, inutile de continuer
        }

        // ✅ Récupérer les réservations de ce client
        userRentBookingsSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (!data.dateFrom || !data.dateTo) return;

          allRentBookings.push({
            id: docSnap.id,
            serviceName: data.serviceName,
            dateFrom: convertFirebaseTimestamp(data.dateFrom),
            dateTo: convertFirebaseTimestamp(data.dateTo),
            price: data.price,
            extraServices: data.extraServices,
            status: data.status,
            userId,
            clientName,
            clientEmail,
            clientPhone,
          });
        });
      }
    } catch (error) {
      console.error("🚨 Erreur lors de la récupération des clients :", error);
    }

    return allRentBookings;
  } catch (error) {
    console.error("🚨 Erreur globale dans fetchRentBookings :", error);
    return [];
  }
};
