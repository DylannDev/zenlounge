// ✅ Type des forfaits venant de Firestore
interface ForfaitFirebase {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
  createdAt: { seconds: number; nanoseconds: number }; // Timestamp Firebase
  userId: string;
}

// ✅ Type des forfaits avec `createdAt` transformé en `Date`
interface Forfait {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
  createdAt: Date; // ✅ Date JavaScript après conversion
  userId: string;
}

// ✅ Mise à jour de l'interface globale
interface ForfaitsBooking {
  forfaits: ForfaitFirebase[];
}
