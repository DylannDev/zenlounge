import { z } from "zod";

export const reviewSchemaClient = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Adresse email invalide"),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères"),
  stars: z.number().min(1, "Veuillez sélectionner au moins 1 étoile"),
});
