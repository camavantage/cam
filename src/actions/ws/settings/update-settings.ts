"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GeneralSettingsformSchemaType } from "@/lib/zod/setup";
import { revalidatePath } from "next/cache";

export async function upsertGeneralSettings(
  formData: GeneralSettingsformSchemaType
) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update settings");
  }

  if (session.user.role === "admin" || session.user.role === "owner") {
    const { id, ...formDataWithoutId } = formData;
    const updatedSettings = await prisma.app
      .update({
        where: { id: id },
        data: { ...formDataWithoutId },
      })
      .catch((e) => {
        throw new Error("Failed to update app settings");
      });
    revalidatePath("/ws");
    return updatedSettings;
  } else {
    throw new Error("You must be admin or owner to update settings");
  }
}
