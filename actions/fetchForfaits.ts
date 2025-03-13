"use server";

import { db } from "@/firebase/firebase";
import { convertFirebaseTimestamp } from "@/lib/utils";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const fetchForfaits = async () => {
  try {
    const clientsRef = collection(db, "clients");
    const clientsSnap = await getDocs(clientsRef);

    let allForfaits: any[] = [];

    for (const clientDoc of clientsSnap.docs) {
      const userId = clientDoc.id;

      // 📌 Récupérer tous les forfaits du client
      const forfaitsRef = collection(db, `clients/${userId}/forfaits`);
      const forfaitsSnap = await getDocs(forfaitsRef);

      // ✅ Si l'utilisateur n'a aucun forfait, passer au suivant
      if (forfaitsSnap.empty) continue;

      // 📌 Récupérer les informations du client
      const userData = clientDoc.data();
      const clientInfo = {
        clientName:
          `${userData.firstName} ${userData.lastName}` || "Non renseigné",
        phone: userData.phone || "Non renseigné",
        email: userData.email || "Non renseigné",
      };

      // 📌 Ajouter les forfaits à la liste
      forfaitsSnap.forEach((forfaitDoc) => {
        const forfaitData = forfaitDoc.data();

        allForfaits.push({
          id: forfaitDoc.id,
          userId,
          createdAt: convertFirebaseTimestamp(forfaitData.createdAt),
          expiresAt: convertFirebaseTimestamp(forfaitData.expiresAt),
          price: forfaitData.price,
          remainingSessions: forfaitData.remainingSessions,
          totalSessions: forfaitData.totalSessions,
          serviceName: forfaitData.serviceName,
          ...clientInfo,
        });
      });
    }

    // ✅ Trier les forfaits par date d'expiration (du plus proche au plus lointain)
    return allForfaits.sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits :", error);
    return [];
  }
};
