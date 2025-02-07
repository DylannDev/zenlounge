"use server";

import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

// ✅ Fonction pour récupérer les infos du client dans Firestore
export const getUserInfos = async (userId: string) => {
  if (!userId) return null; // Vérification de l'UID

  try {
    const userRef = doc(db, "clients", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("Aucun utilisateur trouvé pour cet UID:", userId);
      return null;
    }

    const userData = userSnap.data();

    return {
      clientName: `${userData.firstName} ${userData.lastName}` || "",
      clientEmail: userData.email || "",
      clientPhone: userData.phone || "",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du client:", error);
    return null;
  }
};
