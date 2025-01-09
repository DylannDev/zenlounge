import { z } from "zod";

export const bookingDataSchema = z.object({
  serviceName: z.string(),
  price: z.number(),
  duration: z.number(),
  date: z.preprocess((arg) => {
    if (typeof arg === "string") {
      // Ajoutez une heure si nécessaire
      const parsedDate = new Date(arg);
      if (!isNaN(parsedDate.getTime())) {
        return new Date(parsedDate.toISOString()); // Assure un format complet
      }
    }
    return arg;
  }, z.date()),
  time: z.string(),
  clientEmail: z.string().email(),
  clientName: z.string(),
  clientPhone: z.string(),
});
