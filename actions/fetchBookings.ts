import { db } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchBookings = async (): Promise<any[]> => {
  const bookingsQuery = query(collection(db, "bookings"));
  const snapshot = await getDocs(bookingsQuery);
  const now = new Date();

  // Filtrer les réservations pour exclure celles qui sont passées
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      // Convertir Firebase Timestamp en Date
      if (data.date && data.date.seconds) {
        data.date = new Date(data.date.seconds * 1000);
      }
      return data;
    })
    .filter((booking) => booking.date >= now); // Filtrer les réservations passées
};
