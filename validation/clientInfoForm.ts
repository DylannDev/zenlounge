import { z } from "zod";

export const clientInfoSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("L'email n'est pas valide"),
  phone: z.string().regex(/^\d{10}$/, "Numéro invalide (10 chiffres)"),
});
