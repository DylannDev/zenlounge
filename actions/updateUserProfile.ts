"use server";

import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getCurrentUser } from "./authActions";
import { infosProfileSchema } from "@/validation/Profile";

type UpdateUserData = {
  firstName: string;
  lastName: string;
  phone: string;
};

export const updateUserProfile = async (data: UpdateUserData) => {
  try {
    // Vérifie si l'utilisateur est connecté
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "Utilisateur non connecté" };
    }

    // Validation des données avec Zod
    const parsedData = infosProfileSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, message: "Données invalides" };
    }

    // Référence du document utilisateur
    const userRef = doc(db, "clients", currentUser.uid);

    // Mise à jour des informations dans Firestore
    await updateDoc(userRef, {
      firstName: parsedData.data.firstName,
      lastName: parsedData.data.lastName,
      phone: parsedData.data.phone,
    });

    return { success: true, message: "Informations mises à jour avec succès" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    return { success: false, message: "Erreur serveur. Réessayez plus tard." };
  }
};
