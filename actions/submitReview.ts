"use server";

import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

type submitReviewProps = {
  name: string;
  email: string;
  message: string;
  stars: number;
};

export async function submitReview({
  name,
  email,
  message,
  stars,
}: submitReviewProps) {
  if (!name || !email || !message || typeof stars !== "number" || stars < 1) {
    throw new Error("Tous les champs sont requis et au moins 1 étoile.");
  }

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
