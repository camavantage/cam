import { phoneRegex} from "@/lib/utils";
import { z } from "zod";

// new register schema
export const newRegisterSchema = z
  .object({
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
  })
  ;
// setupSchema as a type
export type NewRegisterSchemaType = z.infer<typeof newRegisterSchema>;
