import { phoneRegex, usernameRegex } from "@/lib/utils";
import { z } from "zod";

// new user form data schema
export const newUserformSchema = z
  .object({
    username: z
      .string({ required_error: "L'identifiant est obligatoire" })
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
    image: z.string().nullable().optional(),
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
    bio: z
      .string()
      .max(255, {
        message: "La description doit comporter au max 255 caractères.",
      })
      .optional(),
    role: z.enum(["subscriber", "author", "editor", "admin", "owner"]),
    blocked: z.boolean().optional(),
    verified: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });
//new user form data schema as a type
export type NewUserformSchemaType = z.infer<typeof newUserformSchema>;

// edit user form data schema
export const editUserformSchema = z.object({
  id: z.string().cuid(),
  username: z
    .string()
    .min(3, {
      message: "L'identifiant doit comporter au moins 3 caractères.",
    })
    .max(15, {
      message: "L'identifiant doit comporter au max 15 caractères.",
    })
    .regex(usernameRegex, {
      message:
        "L'identifiant doit contenir uniquement des lettres miniscules et des chiffres sans espace. Évitez les caractères spéciaux",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail n'est pas valide" })
    .optional(),
  image: z.string().nullable().optional(),
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
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .trim(),
  bio: z
    .string()
    .max(255, {
      message: "La description doit comporter au max 255 caractères.",
    })
    .optional(),
  role: z.enum(["subscriber", "author", "editor", "admin", "owner"]).optional(),
  blocked: z.boolean().optional(),
  verified: z.boolean().optional(),
});
//edit user data form schema as a type
export type EditUserFormSchemaType = z.infer<typeof editUserformSchema>;

// change user password form schema
export const changePasswordformSchema = z
  .object({
    userId: z.string().cuid(),
    newPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export type ChangePasswordformSchemaType = z.infer<
  typeof changePasswordformSchema
>;
