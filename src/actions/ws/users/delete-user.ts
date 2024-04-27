"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().cuid(),
  redirectToUsers: z.boolean().optional(),
});

export async function deleteUser(formData: z.infer<typeof formSchema>) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to delete user");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const deletedUser = await prisma.user
      .delete({ where: { id: formData.userId } })
      .catch(() => {
        throw new Error("Failed to delete user");
      });
    if (formData.redirectToUsers) {
      redirect("/ws/users");
    } else {
      revalidatePath("/ws/users");
      return deletedUser;
    }
  } else {
    throw new Error("You must be admin or owner to delete user");
  }
}
