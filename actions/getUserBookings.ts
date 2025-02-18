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

// ✅ Server Action pour récupérer les services, forfaits et crédits d'un utilisateur
export const getUserBookings = async (userId: string, userEmail: string) => {
  try {
    const bookingsRef = collection(db, "bookings"); // Réservations sans compte
    const clientsRef = doc(db, "clients", userId); // Réservations, forfaits & crédits avec compte

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
    let accountBookings: any = [];
    let forfaits: any = [];
    let credits: any = [];

    if (clientSnapshot.exists()) {
      const clientData = clientSnapshot.data();

      // ✅ Récupérer les réservations du client
      const bookingsSubCollection = collection(
        db,
        `clients/${userId}/bookings`
      );
      const qClientBookings = query(bookingsSubCollection);
      const clientBookingsSnapshot = await getDocs(qClientBookings);
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
      const qForfaits = query(forfaitsSubCollection);
      const forfaitsSnapshot = await getDocs(qForfaits);
      forfaits = forfaitsSnapshot.docs.map((doc) => ({
        id: doc.id,
        userId,
        ...doc.data(),
      }));

      // ✅ Récupérer les crédits du client
      const creditsSubCollection = collection(db, `clients/${userId}/credits`);
      const qCredits = query(creditsSubCollection);
      const creditsSnapshot = await getDocs(qCredits);
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
      credits: credits, // ✅ Retourner les crédits du client
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des services, forfaits et crédits :",
      error
    );
    return {
      success: false,
      message: "Impossible de récupérer vos services, forfaits et crédits.",
    };
  }
};
