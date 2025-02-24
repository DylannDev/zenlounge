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

export const getUserBookings = async (userId: string, userEmail: string) => {
  try {
    const bookingsRef = collection(db, "bookings"); // Réservations sans compte
    const clientsRef = doc(db, "clients", userId); // Réservations et forfaits avec compte

    // 🔹 1. Vérifier les réservations SANS compte via l'email
    const qBookings = query(bookingsRef, where("clientEmail", "==", userEmail));
    const bookingsSnapshot = await getDocs(qBookings);
    const guestBookings = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      userId,
    }));

    // 🔹 2. Vérifier les réservations et forfaits AVEC compte via le userId
    const clientSnapshot = await getDoc(clientsRef);
    let accountBookings: any[] = [];
    let forfaits: any[] = [];
    let credits: any[] = []; // ✅ Initialisation de credits

    if (clientSnapshot.exists()) {
      // ✅ Récupérer les réservations du client
      const bookingsSubCollection = collection(
        db,
        `clients/${userId}/bookings`
      );
      const clientBookingsSnapshot = await getDocs(
        query(bookingsSubCollection)
      );
      accountBookings = clientBookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        userId,
        clientEmail: userEmail,
      }));

      // ✅ Récupérer les forfaits du client
      const forfaitsSubCollection = collection(
        db,
        `clients/${userId}/forfaits`
      );
      const forfaitsSnapshot = await getDocs(query(forfaitsSubCollection));
      forfaits = forfaitsSnapshot.docs.map((doc) => ({
        id: doc.id,
        userId,
        ...doc.data(),
      }));

      // ✅ Récupérer les crédits du client
      const creditsSubCollection = collection(db, `clients/${userId}/credits`);
      const creditsSnapshot = await getDocs(query(creditsSubCollection));
      credits = creditsSnapshot.docs.map((doc) => ({
        id: doc.id,
        userId,
        ...doc.data(),
      }));
    }

    // 🔹 Fusionner les résultats des deux sources
    const allBookings = [...guestBookings, ...accountBookings];

    return {
      success: true,
      services: allBookings,
      forfaits: forfaits,
      credits: credits, // ✅ Retourne toujours credits
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des services, forfaits et crédits :",
      error
    );
    return {
      success: false,
      message: "Impossible de récupérer vos services et forfaits.",
      services: [],
      forfaits: [],
      credits: [], // ✅ Ajout d'un tableau vide même en cas d'erreur
    };
  }
};
