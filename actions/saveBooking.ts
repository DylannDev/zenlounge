import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

type saveBooking = {
  serviceName: string;
  duration: number;
  price: number;
  date: Date | undefined;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
};

export const saveBooking = async (bookingData: saveBooking) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    return docRef.id;
  } catch (e) {
    console.error("Erreur lors de l'enregistrement de la réservation : ", e);
    throw new Error("Échec de l'enregistrement de la réservation.");
  }
};
