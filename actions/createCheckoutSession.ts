"use server";

import { stripe } from "@/lib/stripe";
import { formatDate } from "@/lib/utils";

type createCheckoutSessionType = Omit<BookingDataType, "date"> & {
  date: string;
};

export async function createCheckoutSession(
  bookingData: createCheckoutSessionType
) {
  try {
    const { serviceName, price, duration, date, time, clientEmail } =
      bookingData;

    // Validation des données
    if (!serviceName || !price || !duration || !date || !time || !clientEmail) {
      throw new Error("Tous les champs sont requis.");
    }

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `https://localhost:3000/success`,
      // cancel_url: `https://localhost:3000/cancel`,
      success_url: `https://zenlounge-guyane.vercel.app/success`,
      cancel_url: `https://zenlounge-guyane.vercel.app/cancel`,
      customer_email: clientEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: serviceName,
              description: `${duration} min • ${formatDate(date)} à ${time}`,
              images: ["https://zenlounge-guyane.vercel.app/logo.png"],
            },
            unit_amount: price * 100, // Stripe attend le montant en centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingData: JSON.stringify(bookingData),
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
