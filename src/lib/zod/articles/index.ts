import { tagOptionSchema } from "@/lib/utils";
import { z } from "zod";

// new article form data schema
export const newArticleFormSchema = z.object({
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
  content: z.string(),
  markdown: z.string(),
  imageUrl: z.string(),
  tags: z.array(tagOptionSchema),
  customTags: z.array(tagOptionSchema),
  authorId: z.string().cuid(),
  published: z.boolean(),
  commentable: z.boolean(),
  verified: z.boolean(),
  blocked: z.boolean(),
});
// new article form data schema as a type
export type NewArticleFormSchemaType = z.infer<typeof newArticleFormSchema>;

// edit article form data schema
export const editArticleFormSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string({ required_error: "le titre est obligatoire" })
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
  content: z.string(),
  markdown: z.string(),
  imageUrl: z.string(),
  tags: z.array(tagOptionSchema),
  customTags: z.array(tagOptionSchema),
  authorId: z.string().cuid().optional(),
  published: z.boolean(),
  commentable: z.boolean(),
  verified: z.boolean(),
  blocked: z.boolean(),
});
// edit article form data schema as a type
export type EditArticleFormSchemaType = z.infer<typeof editArticleFormSchema>;
