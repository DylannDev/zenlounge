"use server";

import { cookies } from "next/headers";
import { firebaseAdmin } from "@/firebase/admin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuthErrorMessage } from "@/lib/authErrors";
import { convertFirebaseTimestamp } from "@/lib/utils";

type ClientData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

// 🔹 Stocker le token dans un cookie
export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    cookieStore.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ Permet l'envoi du cookie même après une redirection OAuth
      path: "/", // ✅ Assure que le cookie est disponible sur toutes les routes
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return { success: true, uid: decodedToken.uid };
  } catch (error) {
    return { success: false, message: "Échec de l'authentification" };
  }
};

// 🔹 Supprimer le token lors de la déconnexion
export const removeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  return { success: true };
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  console.log("🔍 Auth Token :", authToken?.value); // Vérifie si le token est bien récupéré

  if (!authToken) return null;

  try {
    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(authToken.value);

    // ✅ Récupérer les infos utilisateur pour connaître le provider utilisé
    const userRecord = await firebaseAdmin.auth().getUser(decodedToken.uid);
    const providerId = userRecord.providerData[0]?.providerId || "unknown";

    console.log("✅ Token décodé :", decodedToken); // Vérifie si le token est bien décodé

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      provider: providerId,
    };
  } catch (error) {
    console.error(
      "❌ Erreur lors de la vérification du token Firebase :",
      error
    );
    return { error: error };
  }
};

export const getUserProfile = async (userId: string) => {
  if (!userId) throw new Error("L'ID utilisateur est requis.");

  try {
    const userRef = doc(db, "clients", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) return null; // Retourne null si l'utilisateur n'existe pas

    const userData = docSnap.data();

    return {
      ...userData,
      id: docSnap.id,
      createdAt: convertFirebaseTimestamp(userData.createdAt),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    throw new Error("Impossible de récupérer le profil utilisateur.");
  }
};

// 🔹 Création de compte avec stockage Firestore
export const signUp = async (data: ClientData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    if (!user) throw new Error("Erreur lors de la création du compte");

    // Stocker l'utilisateur en Firestore
    const clientRef = doc(collection(db, "clients"), user.uid);
    await setDoc(clientRef, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      createdAt: new Date(),
    });

    return { success: true, userId: user.uid };
  } catch (error: any) {
    return { success: false, message: getAuthErrorMessage(error.code) };
  }
};
