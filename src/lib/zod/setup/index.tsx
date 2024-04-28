import { phoneRegex, usernameRegex } from "@/lib/utils";
import { z } from "zod";

// setup the app for the first time schema
export const setupSchema = z
  .object({
    title: z
      .string({ required_error: "Le titre est obligatoire" })
      .min(2, {
        message: "Le titre doit comporter au moins 2 caractères.",
      })
      .trim(),
    description: z
      .string()
      .max(255, {
        message: "La description doit comporter au max 255 caractères.",
      })
      .optional(),
    language: z.enum(["fr", "en"], {
      required_error: "La langue est obligatoire",
    }),
    username: z
      .string({ required_error: "Le nom d'utilisateur est obligatoire" })
      .min(3, {
        message: "L'identifiant doit comporter au moins 3 caractères.",
      })
      .max(15, {
        message: "L'identifiant doit comporter au max 15 caractères.",
      })
      .regex(usernameRegex, {
        message:
          "L'identifiant doit contenir uniquement des lettres miniscules et des chiffres sans espace. Évitez les caractères spéciaux",
      }),
    phone: z
      .string()
      .min(10, {
        message: "Le numéro de téléphone doit comporter au moins 10 chiffres.",
      })
      .max(14, {
        message: "Le numéro de téléphone doit comporter au max 14 chiffres.",
      })
      .regex(phoneRegex, { message: "Le numéro de téléphone n'est valide" })
      .trim()
      .optional(),
    name: z
      .string({ required_error: "Le nom est obligatoire" })
      .min(4, {
        message: "Le nom doit comporter au moins 4 caractères.",
      })
      .trim(),
    email: z
      .string({ required_error: "L'adresse mail est obligatoire" })
      .email({ message: "Le format de l'adresse mail n'est pas valide" }),
    password: z
      .string({ required_error: "Le mot de passe est obligatoire" })
      .min(6, {
        message: "Le mot de passe doit comporter au moins 6 caractères.",
      })
      .max(32, {
        message: "Le mot de passe  doit comporter au max 32 chiffres.",
      }),
    confirmPassword: z
      .string({ required_error: "Le mot de passe est obligatoire" })
      .min(6, {
        message: "Le mot de passe doit comporter au moins 6 caractères.",
      })
      .max(32, {
        message: "Le mot de passe  doit comporter au max 32 chiffres.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });
// setupSchema as a type
export type SetupSchemaType = z.infer<typeof setupSchema>;

// update general settings form schema
export const generalSettingsformSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string({ required_error: "Le titre est obligatoire" })
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  language: z.enum(["fr", "en"], {
    required_error: "La langue est obligatoire",
  }),
  status: z.enum(["online", "offline", "maintenance"], {
    required_error: "Le statut du site est obligatoire",
  }),
});
// update general settings form schema as a type
export type GeneralSettingsformSchemaType = z.infer<
  typeof generalSettingsformSchema
>;
