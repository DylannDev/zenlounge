"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { convertFirebaseTimestamp } from "@/lib/utils"; // ✅ Utilisation de la conversion

// ✅ Fonction pour récupérer les réservations avec ou sans filtre de statut
export const fetchBookings = async (statusFilter?: string): Promise<any[]> => {
  try {
    let allBookings: any[] = [];

    // ✅ Récupérer les réservations des clients sans compte (dans /bookings)
    const publicBookingsQuery = query(collection(db, "bookings"));
    const publicSnapshot = await getDocs(publicBookingsQuery);
    const publicBookings = publicSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: convertFirebaseTimestamp(data.date), // ✅ Conversion propre
          clientName: data.clientName || "Inconnu",
          clientEmail: data.clientEmail || "Non renseigné",
          status: data.status,
        };
      })
      .filter((booking) => !statusFilter || booking.status === statusFilter); // ✅ Filtre optionnel

    allBookings = [...publicBookings];

    // ✅ Récupérer les réservations des CLIENTS ayant un compte dans /clients/{userId}/bookings
    const clientsCollection = await getDocs(collection(db, "clients"));
    for (const clientDoc of clientsCollection.docs) {
      const userId = clientDoc.id;
      const clientData = clientDoc.data();

      const fullName =
        clientData.firstName && clientData.lastName
          ? `${clientData.firstName} ${clientData.lastName}`
          : "Inconnu";
      const email = clientData.email || "Non renseigné";

      // Récupérer les réservations du client
      const clientBookingsQuery = query(
        collection(db, "clients", userId, "bookings")
      );
      const clientSnapshot = await getDocs(clientBookingsQuery);
      const clientBookings = clientSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: convertFirebaseTimestamp(data.date), // ✅ Conversion propre
            clientName: fullName,
            clientEmail: email,
            status: data.status,
          };
        })
        .filter((booking) => !statusFilter || booking.status === statusFilter); // ✅ Filtre optionnel

      allBookings = [...allBookings, ...clientBookings];
    }

    return allBookings;
  } catch (e) {
    console.error("Erreur lors de la récupération des réservations :", e);
    return [];
  }
};
