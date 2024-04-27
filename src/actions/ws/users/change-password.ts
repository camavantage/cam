"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ChangePasswordformSchemaType } from "@/lib/zod/users";

export async function changeUserPassword(formData: ChangePasswordformSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to change password");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const { newPassword, userId } = formData;
    const hashedPWD = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user
      .update({ where: { id: userId }, data: { password: hashedPWD } })
      .catch(() => {
        throw new Error("Failed to update password");
      });
    const { password, ...userWithouPassword } = updatedUser;
    revalidatePath("/ws/users");
    return userWithouPassword;
  } else {
    throw new Error("You must be admin or owner to change password");
  }
}
