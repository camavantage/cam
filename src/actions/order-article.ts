"use server";

import prisma from "@/lib/prisma";
import { OrderStatusType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function orderAnArticle(formData: {
  clientId: string;
  articleId: string;
  price: number;
  status?: OrderStatusType;
},pathname:string) {
  const newOrder = await prisma.articleOrder.create({
    data: {
      ...formData,
    },
  });

  revalidatePath(pathname);
  return newOrder;
}
