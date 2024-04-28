"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { EditUserFormSchemaType } from "@/lib/zod/users";

export async function updateUser(formData: EditUserFormSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update user");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const { id, ...dataWithoutId } = formData;
    const updatedUser = await prisma.user
      .update({ where: { id }, data: dataWithoutId })
      .catch(() => {
        throw new Error("Failed to update user");
      });
    revalidatePath("/ws/users");
    return updatedUser;
  } else {
    throw new Error("You must be admin or owner to update user");
  }
}
