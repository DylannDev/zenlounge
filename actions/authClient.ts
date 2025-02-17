"use client";

import { auth, db, googleProvider } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { setAuthToken, removeAuthToken } from "@/actions/authActions";
import { getAuthErrorMessage } from "@/lib/authErrors";

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
    return { success: false, message: getAuthErrorMessage(error.code) };
  }
};

// 🔹 Connexion avec Google
export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // ✅ Extraire prénom et nom depuis displayName
    const displayName = user.displayName || "";
    const [firstName, ...lastNameArr] = displayName.split(" ");
    const lastName = lastNameArr.join(" ") || ""; // Prend tout après le premier mot

    // Vérifier si l'utilisateur existe en Firestore
    const userRef = doc(collection(db, "clients"), user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: user.email || "",
        phone: user.phoneNumber || "",
      });
    }

    // Récupérer et stocker le token avec la Server Action
    const token = await user.getIdToken();
    await setAuthToken(token);

    return { success: true, userId: user.uid };
  } catch (error: any) {
    console.error("Erreur de connexion avec Google :", error);
    return { success: false, message: getAuthErrorMessage(error.code) };
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
