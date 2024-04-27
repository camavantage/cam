"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { NewUserformSchemaType } from "@/lib/zod/users";

export async function createUser(formData: NewUserformSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to create user");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const { password, confirmPassword, ...dataWithoutPasswords } = formData;
    const hashedPWD = await bcrypt.hash(password, 10);
    await prisma.user
      .create({ data: { ...dataWithoutPasswords, password: hashedPWD } })
      .catch(() => {
        throw new Error("Failed to create user");
      });
    redirect("/ws/users");
  } else {
    throw new Error("You must be admin or owner to create user");
  }
}
