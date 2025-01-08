import { NextResponse } from "next/server";
import Stripe from "stripe";
import { saveBooking } from "@/actions/saveBooking";
import { sendEmail } from "@/actions/sendEmail";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { bookingDataSchema } from "@/validation/bookingData";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature")!;

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    console.error("Erreur de vérification du webhook :", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Récupérer et valider les données de réservation
      const bookingData = bookingDataSchema.parse(
        JSON.parse(session.metadata!.bookingData)
      );

      console.log("bookingData: ", bookingData);

      // Enregistrer la réservation
      await saveBooking(bookingData);

      // Envoyer l'email
      await sendEmail(bookingData);

      console.log("Réservation enregistrée et email envoyé.");
    } catch (err) {
      console.error("Erreur lors de la gestion du webhook :", err);
      return NextResponse.json(
        { error: "Erreur interne lors du traitement." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
