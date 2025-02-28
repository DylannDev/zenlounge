"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// ✅ Fonction pour récupérer tous les clients
export const fetchClients = async (): Promise<any[]> => {
  try {
    const clientsCollection = await getDocs(collection(db, "clients"));

    // ✅ Formater les données des clients
    const clients = clientsCollection.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName:
          data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : "Nom inconnu",
        email: data.email || "Non renseigné",
        phone: data.phone || "Non renseigné",
        createdAt: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000) // 🔥 Conversion timestamp -> Date
          : null, // ✅ Gérer le cas où createdAt est absent
      };
    });

    return clients;
  } catch (e) {
    console.error("Erreur lors de la récupération des clients :", e);
    return [];
  }
};
