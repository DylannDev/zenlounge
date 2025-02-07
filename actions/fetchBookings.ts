"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

// ✅ Fonction pour récupérer toutes les réservations à venir
export const fetchBookings = async (): Promise<any[]> => {
  try {
    const now = new Date();
    let allBookings: any[] = [];

    // ✅ Récupérer les réservations des clients NON CONNECTÉS (dans /bookings)
    const publicBookingsQuery = query(collection(db, "bookings"));
    const publicSnapshot = await getDocs(publicBookingsQuery);
    const publicBookings = publicSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    allBookings = [...publicBookings];

    // ✅ Récupérer les réservations des CLIENTS CONNECTÉS dans /clients/{userId}/bookings
    const clientsCollection = await getDocs(collection(db, "clients"));
    for (const clientDoc of clientsCollection.docs) {
      const userId = clientDoc.id;
      const clientBookingsQuery = query(
        collection(db, "clients", userId, "bookings")
      );
      const clientSnapshot = await getDocs(clientBookingsQuery);
      const clientBookings = clientSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      allBookings = [...allBookings, ...clientBookings];
    }

    // ✅ Filtrer les réservations pour ne garder que celles après aujourd'hui
    return allBookings
      .map((booking) => {
        if (booking.date?.seconds) {
          booking.date = new Date(booking.date.seconds * 1000);
        }
        return booking;
      })
      .filter((booking) => booking.date >= now);
  } catch (e) {
    console.error("Erreur lors de la récupération des réservations :", e);
    return [];
  }
};
