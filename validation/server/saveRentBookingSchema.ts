import { z } from "zod";

// ✅ Fonction pour conditionner la validation selon la connexion de l'utilisateur
export const saveRentBookingSchema = (userId?: string) =>
  z.object({
    serviceName: z.string().min(1, "Le nom du service est requis."),
    dateFrom: z.date({ required_error: "La date d'arrivée est requise." }),
    dateTo: z.date({ required_error: "La date de départ est requise." }),
    price: z.number().positive("Le prix doit être supérieur à zéro."),
    clientName: userId
      ? z.string().optional() // ✅ Pas de validation si connecté
      : z.string().min(1, "Le nom est requis."), // ✅ Obligatoire si pas connecté
    clientEmail: userId
      ? z.string().optional()
      : z.string().email("Email invalide."),
    clientPhone: userId
      ? z.string().optional()
      : z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide."),
    extraServices: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().min(1),
          price: z.number().positive(),
        })
      )
      .optional(),
  });
