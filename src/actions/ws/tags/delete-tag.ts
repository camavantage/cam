"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  tagId: z.string().cuid(),
  redirectToTags: z.boolean().optional(),
});

export async function deleteTag(formData: z.infer<typeof formSchema>) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to delete a tag");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const deletedTag = await prisma.tag
      .delete({ where: { id: formData.tagId } })
      .catch(() => {
        throw new Error("Failed to delete tag");
      });
    if (formData.redirectToTags) {
      redirect("/ws/tags");
    } else {
      revalidatePath("/ws/tags");
      return deletedTag;
    }
  } else {
    throw new Error("You must be admin or owner to delete a tag");
  }
}
