"use server";

import { cookies } from "next/headers";
import { firebaseAdmin } from "@/firebase/admin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

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
      sameSite: "strict",
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

// 🔹 Récupérer l'utilisateur connecté
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) return null;

  try {
    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(authToken.value);
    return { uid: decodedToken.uid, email: decodedToken.email };
  } catch (error) {
    return null;
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
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      isForfait: false,
    });

    // Stocker le token avec la Server Action
    const token = await user.getIdToken();
    await setAuthToken(token);

    return { success: true, userId: user.uid };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
