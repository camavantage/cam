"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function orderAnArticle(formData: {
  clientId: string;
  articleId: string;
}) {
  const newOrder = await prisma.articleOrder.create({
    data: {
      ...formData,
    },
  });

  revalidatePath("/");
  return newOrder;
}
