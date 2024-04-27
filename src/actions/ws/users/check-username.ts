"use server";

import prisma from "@/lib/prisma";
import { usernameRegex } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const usernameType = z
  .string()
  .regex(usernameRegex, {
    message:
      "L'identifiant doit contenir uniquement des lettres miniscules et des chiffres sans espace. Évitez les caractères spéciaux",
  });

export async function checkUsername(username: z.infer<typeof usernameType>) {
  const user = await prisma.user
    .findUnique({ where: { username: username }, select:{username:true} })
    .catch(() => {
      throw new Error("Failed to get user");
    });
  return user?.username;
}
