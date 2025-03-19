import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export const initStripePayment = async (
  bookingData: BookingDataType,
  userId?: string,
  forfaitId?: string
): Promise<void> => {
  try {
    console.log("🔍 BookingData reçu dans initStripePayment :", bookingData);

    // ✅ Création de la session de paiement Stripe
    const checkoutSession = await createCheckoutSession(
      bookingData,
      userId,
      forfaitId
    );

    if (checkoutSession?.success && checkoutSession?.sessionId) {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe n'a pas pu être initialisé.");

      // ✅ Redirection vers Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.sessionId,
      });

      if (error) {
        throw new Error(`Erreur de redirection : ${error.message}`);
      }
    } else {
      throw new Error(
        checkoutSession?.error ||
          "Erreur lors de la création de la session Stripe."
      );
    }
  } catch (error) {
    console.error("Erreur lors du paiement Stripe :", error);
    throw error;
  }
};
