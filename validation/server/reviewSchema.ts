import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères"),
  stars: z
    .number()
    .min(1, "Veuillez sélectionner au moins 1 étoile")
    .max(5, "La note maximale est de 5 étoiles"),
});
