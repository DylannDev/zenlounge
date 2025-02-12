"use server";

import { stripe } from "@/lib/stripe";
import { formatDate } from "@/lib/utils";

// Définition du type pour les paramètres
type InitStripePaymentParams = Omit<BookingDataType, "date"> & { date: string };

// Définition du type de retour
type CreateCheckoutSessionResponse = {
  sessionId?: string;
  success: boolean;
  error?: string;
};

export async function createCheckoutSession(
  bookingData: InitStripePaymentParams,
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
      isForfait,
      forfaitType,
    } = bookingData;

    // Déterminer le nombre de séances selon le type de forfait
    const forfaitLabel =
      forfaitType === "forfait-5" ? "Forfait 5 Séances" : "Forfait 10 Séances";

    // Validation des données
    if (!serviceName || !price || !duration || !date || !time || !clientEmail) {
      throw new Error("Tous les champs sont requis.");
    }

    // ✅ Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `https://localhost:3000/success`,
      cancel_url: `https://localhost:3000/cancel`,
      // success_url: `https://zenlounge-guyane.vercel.app/success`,
      // cancel_url: `https://zenlounge-guyane.vercel.app/cancel`,
      customer_email: clientEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: serviceName,
              description: `${
                isForfait ? forfaitLabel + " • " : ""
              } ${duration} min • ${formatDate(date)} à ${time}`,
              images: ["https://zenlounge-guyane.vercel.app/logo.png"],
            },
            unit_amount: price * 100, // Stripe attend le montant en centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingData: JSON.stringify(bookingData),
        userId: userId || "",
        forfaitId: forfaitId || "",
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
