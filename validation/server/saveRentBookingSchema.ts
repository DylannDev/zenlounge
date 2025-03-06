import { z } from "zod";

// ✅ Schéma de validation pour les réservations
export const saveRentBookingSchema = z.object({
  serviceName: z.string().min(1, "Le nom du service est requis."),
  dateFrom: z.date({ required_error: "La date d'arrivée est requise." }),
  dateTo: z.date({ required_error: "La date de départ est requise." }),
  price: z.number().positive("Le prix doit être supérieur à zéro."),
  clientName: z.string().min(1, "Le nom est requis.").optional(),
  clientEmail: z.string().email("Email invalide.").optional(),
  clientPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "Numéro de téléphone invalide.")
    .optional(),
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
