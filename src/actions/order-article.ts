"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { OrderStatusType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createArticleOrder(
  formData: {
    clientId: string;
    articleId: string;
    price: number;
    status?: OrderStatusType;
  },
  pathname: string
) {
  const newOrder = await prisma.articleOrder.create({
    data: {
      ...formData,
    },
  });

  revalidatePath(pathname);
  return newOrder;
}

export async function confirmOrderArticle(formData: {
  clientId: string;
  articleId: string;
  price: number;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to confirm an order");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const deletedOrder = await prisma.articleOrder
      .update({
        where: {
          articleId_clientId: {
            clientId: formData.clientId,
            articleId: formData.articleId,
          },
        },
        data: { price: formData.price },
      })
      .catch(() => {
        throw new Error("Failed to reject order");
      });
    revalidatePath("/ws/dashboard");
    return deletedOrder;
  } else {
    throw new Error("You must be admin or owner to confirm an order");
  }
}

export async function rejectOrderArticle(formData: {
  clientId: string;
  articleId: string;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to reject an order");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const deletedOrder = await prisma.articleOrder
      .delete({
        where: {
          articleId_clientId: {
            clientId: formData.clientId,
            articleId: formData.articleId,
          },
        },
      })
      .catch(() => {
        throw new Error("Failed to reject order");
      });
    revalidatePath("/ws/dashboard");
    return deletedOrder;
  } else {
    throw new Error("You must be admin or owner to reject an order");
  }
}
