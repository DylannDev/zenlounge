// schemas/booking.ts
import { z } from "zod";

export const bookingDataSchema = z.object({
  serviceName: z.string(),
  price: z.number(),
  duration: z.number(),
  date: z.preprocess((arg) => {
    const parsedDate = new Date(arg as string);
    // Forcer à ignorer le décalage horaire
    return new Date(parsedDate.toLocaleDateString("en-US"));
  }, z.date()),
  time: z.string(),
  clientEmail: z.string().email(),
  clientName: z.string(),
  clientPhone: z.string(),
});
