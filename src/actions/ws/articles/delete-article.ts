"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  articleId: z.string().cuid(),
  redirectToArticles: z.boolean().optional(),
});

export async function deleteArticle(formData: z.infer<typeof formSchema>) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to delete an article");
  }
  const deletedArticle = await prisma.article
    .delete({ where: { id: formData.articleId } })
    .catch(() => {
      throw new Error("Failed to delete article");
    });
  if (formData.redirectToArticles) {
    redirect("/ws/articles");
  } else {
    revalidatePath("/ws/articles");
    return deletedArticle;
  }
}
