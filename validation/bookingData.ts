import { z } from "zod";

// ✅ Fonction pour transformer une date string en objet Date
const parseDate = (arg: unknown) => {
  if (typeof arg === "string") {
    const parsedDate = new Date(arg);
    if (!isNaN(parsedDate.getTime())) {
      // ✅ Met l'heure à 00:00:00 pour uniformiser les dates
      parsedDate.setHours(0, 0, 0, 0);
      return parsedDate;
    }
  }
  return arg;
};

// ✅ Schéma de validation des services supplémentaires (extraServices)
const extraServiceSchema = z.object({
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().min(1),
  icon: z.optional(z.any()), // Icone optionnelle (React Node)
});

// ✅ Schéma principal des données de réservation
export const bookingDataSchema = z.object({
  serviceId: z.string().optional(),
  serviceName: z.string(),
  price: z.number().nonnegative(),
  duration: z.number().optional(),

  // ✅ Gestion des dates (peuvent être string ou Date)
  date: z.preprocess(parseDate, z.union([z.date(), z.string()]).optional()),
  dateFrom: z.preprocess(parseDate, z.union([z.date(), z.string()]).optional()),
  dateTo: z.preprocess(parseDate, z.union([z.date(), z.string()]).optional()),

  time: z.string().optional(),

  // ✅ Informations du client
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientPhone: z.string(),

  // ✅ Gestion des forfaits
  isForfait: z.boolean().optional(),
  forfaitType: z.enum(["forfait-5", "forfait-10"]).optional(),

  // ✅ Services supplémentaires
  extraServices: z.array(extraServiceSchema).optional(),
});
