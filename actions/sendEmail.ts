"use server";

import BookingEmailClient from "@/emails/booking/BookingEmailClient";
import BookingNotification from "@/emails/booking/BookingNotification";
import { resend } from "@/lib/resend";

export const sendEmail = async (
  bookingData: BookingDataType,
  activeCredit?: Credit,
  activeForfait?: Forfait
): Promise<void> => {
  try {
    // Construire le contenu de l'e-mail
    const EmailClient = BookingEmailClient({
      clientName: bookingData.clientName,
      serviceName: bookingData.serviceName,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      price: bookingData.price,
      dateFrom: bookingData.dateFrom,
      dateTo: bookingData.dateTo,
      extraServices: bookingData.extraServices,
      isForfait: bookingData.isForfait,
      activeCredit,
      activeForfait,
    });

    const EmailAdmin = BookingNotification({
      clientName: bookingData.clientName,
      serviceName: bookingData.serviceName,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      price: bookingData.price,
      clientPhone: bookingData.clientPhone,
      dateFrom: bookingData.dateFrom,
      dateTo: bookingData.dateTo,
      extraServices: bookingData.extraServices,
      isForfait: bookingData.isForfait,
      activeCredit,
      activeForfait,
    });

    // Envoyer l'e-mail
    await resend.emails.send({
      from: "Zen Lounge <noreply@zenlounge-guyane.fr>",
      to: [bookingData.clientEmail],
      subject: "Confirmation de votre réservation",
      react: EmailClient,
    });

    await resend.emails.send({
      from: "Zen Lounge <noreply@zenlounge-guyane.fr>",
      to: ["Jeanne Auguste <jowes973@gmail.com>"],
      subject: "Nouvelle réservation",
      react: EmailAdmin,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error.message);
    throw error;
  }
};
