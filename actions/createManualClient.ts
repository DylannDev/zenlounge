"use server";

import { db } from "@/firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export type ManualClientInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
};

// ✅ Normalisation du téléphone : on ne garde que les chiffres pour comparer
// "06 12 34 56 78", "0612345678" et "+33 6 12 34 56 78" comme équivalents.
const normalizePhone = (phone: string): string => phone.replace(/\D/g, "");

/**
 * Crée un client dans /clients pour une réservation prise hors site.
 *
 * - Aucun compte Firebase Auth associé (cf. décision : ces clients ne se
 *   connectent pas au site, juste un doc Firestore).
 * - Dé-duplication par téléphone normalisé : si un client existe déjà avec
 *   le même numéro, on réutilise son id silencieusement.
 */
export const createManualClient = async (
  data: ManualClientInput
): Promise<
  | { success: true; clientId: string; reused: boolean }
  | { success: false; message: string }
> => {
  try {
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const phone = data.phone.trim();
    const email = data.email?.trim() || "";

    if (!firstName || !lastName || !phone) {
      return {
        success: false,
        message: "Prénom, nom et téléphone sont obligatoires.",
      };
    }

    const normalized = normalizePhone(phone);
    if (!normalized) {
      return { success: false, message: "Numéro de téléphone invalide." };
    }

    // 🔍 Recherche d'un client existant avec le même téléphone normalisé
    const clientsSnap = await getDocs(collection(db, "clients"));
    const existing = clientsSnap.docs.find((doc) => {
      const existingPhone = (doc.data().phone as string | undefined) ?? "";
      return existingPhone && normalizePhone(existingPhone) === normalized;
    });

    if (existing) {
      return { success: true, clientId: existing.id, reused: true };
    }

    // 🆕 Création d'un nouveau client (même schéma que le signUp public)
    const docRef = await addDoc(collection(db, "clients"), {
      firstName,
      lastName,
      email,
      phone,
      createdAt: new Date(),
    });

    return { success: true, clientId: docRef.id, reused: false };
  } catch (e) {
    console.error("Erreur création client manuel :", e);
    return {
      success: false,
      message:
        e instanceof Error ? e.message : "Échec de la création du client.",
    };
  }
};
