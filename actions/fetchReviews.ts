"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

type Review = {
  id: string;
  name: string;
  title: string;
  message: string;
  stars: number;
};

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const reviewsSnapshot = await getDocs(reviewsCollection);
    const reviews = reviewsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];

    return reviews;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};
