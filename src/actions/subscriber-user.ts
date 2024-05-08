"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { NewSubscriberSchemaType } from "@/lib/zod/subscriber";
import { createUsername } from "@/lib/utils";
import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function subscriberUser(
  formData: NewSubscriberSchemaType,
  pathname: string
) {
  const { password, ...dataWithoutPassword } = formData;
  const hashedPWD = await bcrypt.hash(password, 10);
  const newUser = await prisma.user
    .create({
      data: {
        ...dataWithoutPassword,
        password: hashedPWD,
        username: createUsername(),
      },
    })
    .catch(() => {
      throw new Error("Failed to create article");
    });

  await signIn("credentials", {
    email: newUser.email,
    password: formData.password,
    redirectTo: `${pathname}?connected=true`,
  }).catch((e) => {
    if (isRedirectError(e)) {
      throw e;
    }
    throw new Error("fail to signIn");
  });
}
