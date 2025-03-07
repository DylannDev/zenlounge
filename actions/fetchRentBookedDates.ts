"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { startOfDay, isValid } from "date-fns";

// ✅ Type des plages de dates réservées
interface BookedDateRange {
  from: Date;
  to: Date;
}

// ✅ Fonction pour récupérer les dates déjà réservées
export const fetchRentBookedDates = async (): Promise<BookedDateRange[]> => {
  try {
    const today = startOfDay(new Date());
    let bookedDates: BookedDateRange[] = [];

    // 📌 Récupération des réservations globales dans "rentBookings"
    const rentBookingsRef = collection(db, "rentBookings");
    const rentBookingsSnap = await getDocs(rentBookingsRef);

    rentBookingsSnap.forEach((doc) => {
      const data = doc.data();

      const from = data.dateFrom.toDate ? data.dateFrom.toDate() : null;
      const to = data.dateTo.toDate ? data.dateTo.toDate() : null;

      if (from && to && isValid(from) && isValid(to) && to >= today) {
        bookedDates.push({ from, to });
      }
    });

    // 📌 Récupération des réservations des clients inscrits
    const clientsRef = collection(db, "clients");
    const clientsSnap = await getDocs(clientsRef);

    for (const clientDoc of clientsSnap.docs) {
      const userId = clientDoc.id;
      const userRentBookingsRef = collection(
        db,
        "clients",
        userId,
        "rentBookings"
      );
      const userRentBookingsSnap = await getDocs(userRentBookingsRef);

      userRentBookingsSnap.forEach((doc) => {
        const data = doc.data();

        const from = data.dateFrom.toDate ? data.dateFrom.toDate() : null;
        const to = data.dateTo.toDate ? data.dateTo.toDate() : null;

        if (from && to && isValid(from) && isValid(to) && to >= today) {
          bookedDates.push({ from, to });
        }
      });
    }

    return bookedDates;
  } catch (error) {
    console.error(
      "🚨 Erreur lors de la récupération des réservations :",
      error
    );
    return [];
  }
};
