"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { EditTagformSchemaType } from "@/lib/zod/tags";
import { revalidatePath } from "next/cache";

export async function updateTag(formData: EditTagformSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update tag");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const updatedTag = await prisma.tag
      .update({ where: { id: formData.id }, data: formData })
      .catch(() => {
        throw new Error("Failed to update tag");
      });
    revalidatePath("/ws/tags");
    return updatedTag;
  } else {
    throw new Error("You must be admin or owner to update tag");
  }
}
