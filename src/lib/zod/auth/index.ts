import { z } from "zod";

// sign in with email and password schema
export const signInSchema = z.object({
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
});
// signInSchema as a type
export type SignInSchemaType = z.infer<typeof signInSchema>;
