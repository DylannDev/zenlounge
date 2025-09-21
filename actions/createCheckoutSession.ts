"use server";

import { stripe } from "@/lib/stripe";
import { formatDate } from "@/lib/utils";

// Définition du type de retour
type CreateCheckoutSessionResponse = {
  sessionId?: string;
  success: boolean;
  error?: string;
};

export async function createCheckoutSession(
  bookingData: BookingDataType,
  userId?: string,
  forfaitId?: string
): Promise<CreateCheckoutSessionResponse> {
  try {
    const {
      serviceName,
      price,
      duration,
      date,
      time,
      clientEmail,
      clientName,
      clientPhone,
      isForfait,
      forfaitType,
      dateFrom,
      dateTo,
      extraServices,
    } = bookingData;

    // ✅ Déterminer le nombre de séances selon le type de forfait
    const forfaitLabel =
      forfaitType === "forfait-5" ? "Forfait 5 Séances" : "Forfait 10 Séances";

    // ✅ Vérification des données pour RentBooking
    const isRentBooking = !!(dateFrom && dateTo);

    // // ✅ Validation des données
    // if (!isRentBooking && !isForfait && duration === undefined) {
    //   throw new Error("La durée est requise pour les prestations classiques.");
    // }

    // if (!isForfait && !isRentBooking && (!date || !time)) {
    //   throw new Error("Les champs date et heure sont obligatoires.");
    // }

    // if (!userId && (!clientName || !clientEmail || !clientPhone)) {
    //   throw new Error(
    //     "Le nom, l'email et le téléphone sont requis pour les utilisateurs non connectés."
    //   );
    // }

    // if (isRentBooking && (!dateFrom || !dateTo)) {
    //   throw new Error(
    //     "Les dates de début et de fin de réservation sont requises."
    //   );
    // }

    // ✅ Génération de la description de la réservation
    let description = isForfait
      ? `${forfaitLabel} • ${duration} min`
      : isRentBooking
        ? `Location du ${formatDate(dateFrom!, false)} au ${formatDate(dateTo!, false)}`
        : `${duration} min • ${formatDate(date!)} à ${time}`;

    // ✅ Ajout des extras à la description si présents
    if (extraServices && extraServices.length > 0) {
      const extrasDescription = extraServices
        .map((extra) => `${extra.quantity}x ${extra.name}`)
        .join(", ");
      description += ` • Extras: ${extrasDescription}`;
    }

    // ✅ Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `https://localhost:3000/success`,
      // cancel_url: `https://localhost:3000/cancel`,
      success_url: `https://zenlounge-guyane.fr/success`,
      cancel_url: `https://zenlounge-guyane.fr/cancel`,
      customer_email: clientEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: serviceName,
              description,
              images: ["https://zenlounge-guyane.fr/logo.png"],
            },
            unit_amount: price * 100, // Stripe attend le montant en centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingData: JSON.stringify(bookingData),
        userId: userId || "",
        forfaitId: forfaitId || null,
      },
    });

    return { sessionId: session.id, success: true };
  } catch (error: any) {
    console.error(
      "Erreur lors de la création de la session Stripe :",
      error.message
    );
    return { error: error.message, success: false };
  }
}
