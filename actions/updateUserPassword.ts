"use server";

import { getCurrentUser } from "./authActions";
import { firebaseAdmin } from "@/firebase/admin";

export const updateUserPassword = async (newPassword: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "Utilisateur non authentifié." };
    }

    // ✅ Mise à jour du mot de passe avec Firebase Admin
    await firebaseAdmin.auth().updateUser(currentUser.uid, {
      password: newPassword,
    });

    return { success: true, message: "Mot de passe mis à jour avec succès !" };
  } catch (error: any) {
    console.error("Erreur mise à jour du mot de passe :", error.message);
    return {
      success: false,
      message: "Erreur lors de la mise à jour du mot de passe.",
    };
  }
};
