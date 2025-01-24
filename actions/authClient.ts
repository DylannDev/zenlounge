"use client";

import { auth, db, googleProvider } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { setAuthToken, removeAuthToken } from "@/actions/authActions";

// 🔹 Connexion avec email & mot de passe
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Stocker le token avec la Server Action
    const token = await user.getIdToken();
    await setAuthToken(token);

    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// 🔹 Connexion avec Google
export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Vérifier si l'utilisateur existe en Firestore
    const userRef = doc(collection(db, "clients"), user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        isForfait: false,
      });
    }

    // Stocker le token avec la Server Action
    const token = await user.getIdToken();
    await setAuthToken(token);

    return { success: true, userId: user.uid };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// 🔹 Déconnexion
export const logout = async () => {
  try {
    await signOut(auth);
    await removeAuthToken();
  } catch (error: any) {
    console.error("Erreur de déconnexion :", error);
  }
};
