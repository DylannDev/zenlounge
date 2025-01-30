import { z } from "zod";

// ✅ Validation du formulaire des informations utilisateur
export const infosProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères.")
    .max(50, "Le prénom est trop long"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  phone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide"),
});

// ✅ Validation du formulaire de modification du mot de passe
export const credentialProfileSchema = z.object({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});
