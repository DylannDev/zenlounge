import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export const saveBooking = async (bookingData: BookingDataType) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    return docRef.id;
  } catch (e) {
    console.error("Erreur lors de l'enregistrement de la réservation : ", e);
    throw new Error("Échec de l'enregistrement de la réservation.");
  }
};
