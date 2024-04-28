"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NewTagformSchemaType } from "@/lib/zod/tags";
import { revalidatePath } from "next/cache";


export async function createTag(formData: NewTagformSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to create a tag");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const newTag = await prisma.tag.create({ data: formData }).catch(() => {
      throw new Error("Failed to create tag");
    });
    revalidatePath("/ws/tags");
    return newTag;
  } else {
    throw new Error("You must be admin or owner to create a tag");
  }
}
