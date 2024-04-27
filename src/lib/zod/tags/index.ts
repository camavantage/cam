import { z } from "zod";

//new tag form data schema
export const newTagformSchema = z.object({
  name: z
    .string({ required_error: "Le nom du tag est obligatoire" })
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  slug: z.string({ required_error: "Le slug est obligatoire" }),
  description: z
    .string()
    .max(255, {
      message: "La description doit comporter au max 255 caractères.",
    })
    .optional(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  verified: z.boolean(),
});
//new tag form schema as type
export type NewTagformSchemaType = z.infer<typeof newTagformSchema>;

// edit tag form data schema 
export const editTagformSchema = z.object({
    id: z.string().cuid(),
    name: z
      .string({required_error:"Le nom du tag est obligatoire"})
      .min(2, {
        message: "Le titre doit comporter au moins 2 caractères.",
      })
      .trim(),
    slug: z.string({required_error:"Le slug est obligatoire"}),
    description: z
      .string()
      .max(255, {
        message: "La description doit comporter au max 255 caractères.",
      })
      .optional(),
    imageUrl: z.string().optional(),
    published: z.boolean().optional(),
    verified: z.boolean().optional(),
  });

  // edit tag form data schema as a type
  export type EditTagformSchemaType=z.infer<typeof editTagformSchema>