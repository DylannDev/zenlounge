import { NextResponse } from "next/server";
import Stripe from "stripe";
import { saveBooking } from "@/actions/saveBooking";
import { sendEmail } from "@/actions/sendEmail";
import { stripe } from "@/lib/stripe";

export const config = {
  api: {
    bodyParser: false, // Stripe demande de désactiver bodyParser pour les webhooks
  },
};

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    // Vérifier l'événement Stripe
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    console.error("Erreur de vérification du webhook :", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  // Gérer l'événement `checkout.session.completed`
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Récupérer les données de la session Stripe
      const bookingData = JSON.parse(session.metadata!.bookingData);

      // Enregistrer la réservation dans Firebase
      await saveBooking(bookingData);

      // Envoyer un email de confirmation au client
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
