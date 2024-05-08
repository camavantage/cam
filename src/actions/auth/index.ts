"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SignInSchemaType } from "@/lib/zod/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function authUser(credentials: SignInSchemaType) {
  const { email, password } = credentials;
  const user = await prisma.user
    .findUnique({
      where: {
        email: email,
        blocked: false,
      },
    })
    .catch(() => {
      throw new Error("fail to find user by email");
    });

  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } else {
    return null;
  }
}

export async function signWithCredentials(
  formData: SignInSchemaType & { callbackUrl?: string | null }
) {
  const { callbackUrl, ...formDataWithoutCallbackUrl } = formData;
  await signIn("credentials", {
    ...formDataWithoutCallbackUrl,
    redirectTo: callbackUrl || "/ws",
    redirect: true,
  }).catch((e) => {
    if (isRedirectError(e)) {
      throw e;
    }
    throw new Error("fail to signIn");
  });
}

export async function logOut() {
  await signOut({ redirectTo: "/login", redirect: true }).catch((e) => {
    if (isRedirectError(e)) {
      throw e;
    }
    throw new Error("fail to sign out");
  });
}

export async function signInAsASubscriber(formData: SignInSchemaType) {
  const res = await signIn("credentials", {
    ...formData,
    redirect: true,
  }).catch((e) => {
    if (isRedirectError(e)) {
      throw e;
    }
    throw new Error("fail to signIn");
  });
  if (!res) {
    return "ok";
  } else {
    throw new Error("L'adresse mail ou le mot de passe est incorrect!");
  }
}
