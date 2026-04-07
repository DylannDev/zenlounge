export const dynamic = "force-dynamic";

import { fetchBookings } from "@/actions/fetchBookings";
import { fetchClients } from "@/actions/fetchClients";
import AdminBookingForm from "@/components/admin/AdminBookingForm";

const NewBookingPage = async () => {
  const [bookings, clients] = await Promise.all([
    fetchBookings("confirmed"),
    fetchClients(),
  ]);

  // ✅ Normalise les dates : fetchBookings renvoie parfois des Date invalides
  // car certaines réservations stockent `date` comme string "yyyy-MM-dd"
  // (cas du BookingForm public) plutôt que comme Timestamp Firestore.
  // On passe une string ISO au composant client pour éviter toute ambiguïté
  // de sérialisation server→client.
  const toIsoOrNull = (raw: unknown): string | null => {
    if (!raw) return null;
    const d = raw instanceof Date ? raw : new Date(raw as string);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  const slotBookings = bookings
    .map((b) => ({
      dateIso: toIsoOrNull(b.date),
      time: b.time as string | undefined,
      duration: b.duration as number | undefined,
    }))
    .filter(
      (b): b is { dateIso: string; time: string; duration: number } =>
        b.dateIso !== null && !!b.time && typeof b.duration === "number"
    );

  // ✅ Sérialisable + on retire les clients sans email/téléphone du sélecteur
  const selectableClients = clients
    .filter((c) => c.fullName !== "Nom inconnu")
    .map((c) => ({
      id: c.id,
      fullName: c.fullName,
      email: c.email,
      phone: c.phone,
    }));

  return (
    <section className="w-full max-w-[1100px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Créer une réservation</h2>
        <p className="text-sm text-blue-light">
          Enregistrez une réservation prise par téléphone. Les créneaux déjà
          occupés (en ligne ou manuels) sont automatiquement masqués.
        </p>
      </div>
      <AdminBookingForm
        slotBookings={slotBookings}
        clients={selectableClients}
      />
    </section>
  );
};

export default NewBookingPage;
