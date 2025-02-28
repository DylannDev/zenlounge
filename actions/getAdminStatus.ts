"use server";

import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getCurrentUser } from "@/actions/authActions";

// ✅ Vérifier si l'utilisateur est admin
export const getAdminStatus = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return false; // ✅ Pas connecté

    const adminRef = doc(db, "admin", user.uid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      return adminSnap.data().name;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'admin :", error);
    return false;
  }
};
