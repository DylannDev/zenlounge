"use server";

import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { convertFirebaseTimestamp } from "@/lib/utils";

export const getUserBookings = async (userId: string, userEmail: string) => {
  try {
    if (!userId && !userEmail) {
      throw new Error("🚨 userId et userEmail sont requis !");
    }

    let allBookings: any[] = [];
    let forfaits: any[] = [];
    let credits: any[] = [];
    let rentBookings: any[] = [];

    // 📌 Récupération des réservations SANS compte
    const bookingsRef = collection(db, "bookings");
    const rentBookingsRef = collection(db, "rentBookings");

    const qBookings = query(bookingsRef, where("clientEmail", "==", userEmail));
    const qRentBookings = query(
      rentBookingsRef,
      where("clientEmail", "==", userEmail)
    );

    const [bookingsSnapshot, rentBookingsSnapshot] = await Promise.all([
      getDocs(qBookings),
      getDocs(qRentBookings),
    ]);

    const guestBookings = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      userId,
      date: convertFirebaseTimestamp(doc.data().date),
    }));

    const guestRentBookings = rentBookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      userId,
      type: "rentBooking",
      dateFrom: convertFirebaseTimestamp(doc.data().dateFrom),
      dateTo: convertFirebaseTimestamp(doc.data().dateTo),
    }));

    // 📌 Récupération des réservations AVEC compte
    if (userId) {
      const clientsRef = doc(db, "clients", userId);
      const clientSnapshot = await getDoc(clientsRef);

      if (clientSnapshot.exists()) {
        // 📌 Récupération des réservations de services
        const bookingsSubCollection = collection(
          db,
          `clients/${userId}/bookings`
        );
        const clientBookingsSnapshot = await getDocs(bookingsSubCollection);
        const accountBookings = clientBookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userId,
          clientEmail: userEmail,
          clientName: `${clientSnapshot.data().firstName} ${clientSnapshot.data().lastName}`,
          clientPhone: clientSnapshot.data().phone,
          date: convertFirebaseTimestamp(doc.data().date),
        }));

        // 📌 Récupération des forfaits
        const forfaitsSubCollection = collection(
          db,
          `clients/${userId}/forfaits`
        );
        const forfaitsSnapshot = await getDocs(forfaitsSubCollection);
        forfaits = forfaitsSnapshot.docs.map((doc) => ({
          id: doc.id,
          userId,
          ...doc.data(),
          createdAt: convertFirebaseTimestamp(doc.data().createdAt),
          expiresAt: convertFirebaseTimestamp(doc.data().expiresAt),
        }));

        // 📌 Récupération des crédits
        const creditsSubCollection = collection(
          db,
          `clients/${userId}/credits`
        );
        const creditsSnapshot = await getDocs(creditsSubCollection);
        credits = creditsSnapshot.docs.map((doc) => ({
          id: doc.id,
          userId,
          ...doc.data(),
          createdAt: convertFirebaseTimestamp(doc.data().createdAt),
          expiresAt: convertFirebaseTimestamp(doc.data().expiresAt),
        }));

        // 📌 Récupération des réservations de location AVEC compte
        const rentBookingsSubCollection = collection(
          db,
          `clients/${userId}/rentBookings`
        );
        const rentBookingsSnapshot = await getDocs(rentBookingsSubCollection);
        rentBookings = rentBookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          userId,
          ...doc.data(),
          clientEmail: userEmail,
          clientName: `${clientSnapshot.data().firstName} ${clientSnapshot.data().lastName}`,
          clientPhone: clientSnapshot.data().phone,
          type: "rentBooking",
          dateFrom: convertFirebaseTimestamp(doc.data().dateFrom),
          dateTo: convertFirebaseTimestamp(doc.data().dateTo),
        }));

        allBookings = [...guestBookings, ...accountBookings];
      }
    }

    // 📌 Fusionner toutes les réservations et locations
    const servicesAndRentals = [
      ...allBookings,
      ...guestRentBookings,
      ...rentBookings,
    ];

    return {
      success: true,
      services: servicesAndRentals,
      forfaits,
      credits,
    };
  } catch (error) {
    console.error(
      "🚨 Erreur lors de la récupération des services, forfaits et locations :",
      error
    );
    return {
      success: false,
      message: "Impossible de récupérer vos réservations.",
      services: [],
      forfaits: [],
      credits: [],
    };
  }
};
