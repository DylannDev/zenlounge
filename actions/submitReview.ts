"use server";

import { db } from "@/firebase/firebase";
import { reviewSchema } from "@/validation/server/reviewSchema";
import { addDoc, collection } from "firebase/firestore";

export async function submitReview(formData: any) {
  // ✅ Vérification des données avec Zod
  const parsedData = reviewSchema.safeParse(formData);

  if (!parsedData.success) {
    console.error("Validation échouée :", parsedData.error.format());
    throw new Error("Données invalides.");
  }

  const { name, email, message, stars } = parsedData.data;

  try {
    const reviewRef = await addDoc(collection(db, "reviews"), {
      name,
      email,
      message,
      stars,
      createdAt: new Date(),
    });
    return { success: true, id: reviewRef.id };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    throw new Error("Erreur lors de l'ajout de l'avis.");
  }
}
