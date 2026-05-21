import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre nom (2 caractères minimum).")
    .max(120, "Nom trop long."),
  email: z
    .string()
    .trim()
    .email("Adresse email invalide.")
    .max(180, "Email trop long."),
  phone: z
    .string()
    .trim()
    .max(40, "Téléphone trop long.")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, "Société trop longue.")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(160, "Sujet trop long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre projet en quelques mots (10 caractères minimum).")
    .max(4000, "Message trop long."),
  // Honeypot: bots fill it; the route silently discards. Not validated here so
  // schema failure can't reveal the field's purpose.
  company_url: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Email invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export const updateStatusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});
