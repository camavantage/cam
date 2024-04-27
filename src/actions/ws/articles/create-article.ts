"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatSlug } from "@/lib/utils";
import { NewArticleFormSchemaType } from "@/lib/zod/articles";
import { redirect } from "next/navigation";

export async function createArticle(formData: NewArticleFormSchemaType) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to create an article");
  }

  const { tags, customTags, ...formDataWithoutTags } = formData;

  const slug = formatSlug(formData.title);
  const year = new Date().getFullYear();

  const tagIds = tags.map((tag) => {
    return { tagId: tag.value };
  });

  const newArticle = await prisma.article
    .create({
      data: { year, slug, ...formDataWithoutTags, tags: { create: tagIds } },
    })
    .catch(() => {
      throw new Error("Failed to create article");
    });
  redirect(`/ws/articles/${newArticle.id}?new=success`);
}
