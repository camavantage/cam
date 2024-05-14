"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth, unstable_update } from "@/lib/auth";
import {
  EditPasswordformSchemaType,
  EditUserFormSchemaType,
} from "@/lib/zod/users";

export async function updateProfile(formData: EditUserFormSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update profile");
  }
  if (session.user.id === formData.id) {
    const { id, ...dataWithoutId } = formData;

    const updatedUser = await prisma.user
      .update({ where: { id }, data: dataWithoutId })
      .catch(() => {
        throw new Error("Failed to update user");
      });

    const { password, ...userWithoutPassword } = updatedUser;

    await unstable_update({ user: { ...userWithoutPassword } });
    revalidatePath("/member");
    return userWithoutPassword;
  } else {
    throw new Error("You must be the owner of account to update profile");
  }
}

export async function editPassword(formData: EditPasswordformSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to change password");
  }
  if (session.user.id === formData.userId) {
    // const { newPassword, userId } = formData;
    const userOldPassword = await prisma.user.findUnique({
      where: { id: formData.userId },
      select: { password: true },
    });

    if (
      await bcrypt.compare(
        formData.oldPassword,
        String(userOldPassword?.password)
      )
    ) {
      const newHashedPWD = await bcrypt.hash(formData.newPassword, 10);
      const updatedUser = await prisma.user
        .update({
          where: { id: formData.userId },
          data: { password: newHashedPWD },
        })
        .catch(() => {
          throw new Error("Failed to update password");
        });
      const { password, ...userWithouPassword } = updatedUser;
      revalidatePath("/member");
      return userWithouPassword;
    }
  } else {
    throw new Error("You must be owner of the account to change password");
  }
}
