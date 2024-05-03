import { z } from "zod";

// create new newsletter contact schema
export const newNewsletterContactSchema = z.object({
  email: z
    .string({ required_error: "L'adresse mail est obligatoire" })
    .email({ message: "Le format de l'adresse mail n'est pas valide" }),
});
// newNewsletterContactSchema as a type
export type NewNewsletterContactSchemaType = z.infer<typeof newNewsletterContactSchema>;
