"use server";

import CancellationEmailClient from "@/emails/cancellation/CancellationEmailClient";
import CancellationNotification from "@/emails/cancellation/CancellationNotification";
import { resend } from "@/lib/resend";

export const sendCancellationEmail = async (cancellationData: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  date?: string;
  time?: string;
  dateFrom?: string;
  dateTo?: string;
  forfaitId?: string | null;
  isRentBooking?: boolean;
}): Promise<void> => {
  try {
    // Validation des données
    if (
      !cancellationData.clientName ||
      !cancellationData.clientEmail ||
      !cancellationData.serviceName
    ) {
      throw new Error("Les données d'annulation sont incomplètes.");
    }

    // Construire les emails en fonction du type de réservation
    const EmailClient = CancellationEmailClient(cancellationData);
    const EmailAdmin = CancellationNotification(cancellationData);

    // Envoyer l'e-mail au client
    await resend.emails.send({
      from: "Zen Lounge <contact@vizionweb.fr>",
      // to: [cancellationData.clientEmail],
      to: "d.xavero@hotmail.com",
      subject: "Votre réservation a été annulée",
      react: EmailClient,
    });

    // Envoyer l'e-mail à l'admin
    await resend.emails.send({
      from: "Zen Lounge <contact@vizionweb.fr>",
      to: ["Zen Lounge <contact@vizionweb.fr>"],
      subject: "Annulation de réservation",
      react: EmailAdmin,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error.message);
    throw error;
  }
};
