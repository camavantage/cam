"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatSlug } from "@/lib/utils";
import { EditArticleFormSchemaType } from "@/lib/zod/articles";
import { revalidatePath } from "next/cache";

export async function updateArticle(formData: EditArticleFormSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update an article");
  }
  const { tags, customTags, ...formDataWithoutTags } = formData;

  const slug = formatSlug(formData.title);
  const year = new Date().getFullYear();

  const newTagIds = tags.map((tag) => {
    return { tagId: tag.value };
  });

  const updatedArticle = await prisma.article
    .update({
      where: { id: formData.id },
      data: {
        year,
        slug,
        ...formDataWithoutTags,
        tags: { deleteMany: {}, create: newTagIds },
      },
    })
    .catch(() => {
      throw new Error("Failed to update article");
    });

  revalidatePath(`/ws/articles`);
  return updatedArticle;
}
