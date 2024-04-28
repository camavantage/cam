"use server";
import bcrypt from "bcryptjs";

import { SetupSchemaType, setupSchema } from "@/lib/zod/setup";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function setup(formData: SetupSchemaType) {
  const {
    title,
    description,
    language,
    name,
    email,
    username,
    phone,
    password,
  } = await setupSchema.parseAsync(formData).catch((e) => {
    throw new Error("fail to parse formData");
  });

  const hashedPWD = await bcrypt.hash(password, 10);

  await prisma
    .$transaction(async (tx) => {
      await tx.app.create({
        data: {
          title,
          description,
          language,
          status: "online",
        },
      });
      await tx.user.create({
        data: {
          email,
          password: hashedPWD,
          role: "owner",
          username,
          name,
          phone,
          verified:true
        },
      });
    })
    .catch((e) => {
      throw new Error("Fail to setup your app");
    });
  redirect("/login?setup=success");
}

export async function getAppSetup() {
  try {
    const app = await prisma.app.findFirst().catch((e) => {
      throw new Error("fail to get app");
    });

    return app;
  } catch (e: any) {}
}
