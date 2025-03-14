import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^[0-9]{10}$/, "Le numéro doit contenir 10 chiffres"),
});
