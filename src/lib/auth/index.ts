import { authUser } from "@/actions/auth";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../zod/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = nextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = await signInSchema
          .parseAsync(credentials)
          .catch(() => {
            throw new Error("Fail to parse credentials");
          });
        const user = await authUser(parsedCredentials);

        if (user) {
          return user;
        }
        // User not found.
        return null;
      },
    }),
  ],
  
});
