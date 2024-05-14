"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, unstable_update } from "@/lib/auth";
import { EditUserFormSchemaType } from "@/lib/zod/users";

export async function updateProfile(formData: EditUserFormSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update user");
  }
  if (session.user.id === formData.id) {
    const { id, ...dataWithoutId } = formData;
    const updatedUser = await prisma.user
      .update({ where: { id }, data: dataWithoutId })
      .catch(() => {
        throw new Error("Failed to update user");
      });
    const { password, ...userWithoutPassword } = updatedUser;
    // await unstable_update({ user: userWithoutPassword });
    revalidatePath("/member");
    return userWithoutPassword;
  } else {
    throw new Error("You must be the owner of account to update profile");
  }
}
