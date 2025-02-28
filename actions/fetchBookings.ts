"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

// ✅ Fonction pour récupérer toutes les réservations (passées & futures)
export const fetchBookings = async (): Promise<any[]> => {
  try {
    let allBookings: any[] = [];

    // ✅ Récupérer les réservations des clients NON CONNECTÉS (dans /bookings)
    const publicBookingsQuery = query(collection(db, "bookings"));
    const publicSnapshot = await getDocs(publicBookingsQuery);
    const publicBookings = publicSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.seconds
        ? new Date(doc.data().date.seconds * 1000)
        : null,
      clientName: doc.data().clientName || "Inconnu",
      clientEmail: doc.data().clientEmail || "Non renseigné",
    }));

    allBookings = [...publicBookings];

    // ✅ Récupérer les réservations des CLIENTS CONNECTÉS dans /clients/{userId}/bookings
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
      const clientBookings = clientSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.seconds
          ? new Date(doc.data().date.seconds * 1000)
          : null,
        clientName: fullName,
        clientEmail: email,
      }));

      allBookings = [...allBookings, ...clientBookings];
    }

    return allBookings;
  } catch (e) {
    console.error("Erreur lors de la récupération des réservations :", e);
    return [];
  }
};
