import { z } from "zod";

export const bookingDataSchema = z.object({
  serviceName: z.string(),
  price: z.number(),
  duration: z.number(),
  date: z.string(),
  time: z.string(),
  clientEmail: z.string().email(),
  clientName: z.string(),
  clientPhone: z.string(),
});
