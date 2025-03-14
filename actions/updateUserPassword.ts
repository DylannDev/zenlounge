"use server";

import { getCurrentUser } from "./authActions";
import { firebaseAdmin } from "@/firebase/admin";
import { z } from "zod";

// ✅ Schéma de validation Zod uniquement pour `newPassword`
const newPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères."),
});

export const updateUserPassword = async (newPassword: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "Utilisateur non authentifié." };
    }

    // ✅ Validation de `newPassword`
    const parsedData = newPasswordSchema.safeParse({ newPassword });
    if (!parsedData.success) {
      return {
        success: false,
        message: parsedData.error.errors[0].message, // Retourne le message d'erreur
      };
    }

    // ✅ Mise à jour du mot de passe avec Firebase Admin
    await firebaseAdmin.auth().updateUser(currentUser.uid, {
      password: parsedData.data.newPassword, // Utilisation du mot de passe validé
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
