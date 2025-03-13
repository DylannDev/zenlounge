// ✅ Type des forfaits avec `createdAt` transformé en `Date`
interface Forfait {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

// ✅ Mise à jour de l'interface globale
interface ForfaitsBooking {
  forfaits: Forfait[];
}
