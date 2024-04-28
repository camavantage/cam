import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },

    authorized: ({ auth, request: { nextUrl, url } }) => {
      if (nextUrl.pathname.startsWith("/ws") && auth === null) {
        return false;
      }
      if (nextUrl.pathname.startsWith("/login") && auth) {
        return Response.redirect(new URL("/ws", url));
      }

      if (
        nextUrl.pathname.startsWith("/ws") &&
        auth &&
        (auth.user.role === "subscriber" ||
          auth.user.role === "author" ||
          auth.user.role === "editor")
      ) {
        return Response.redirect(new URL("/", url));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
