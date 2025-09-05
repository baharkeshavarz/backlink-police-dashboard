/* eslint-disable @typescript-eslint/no-unused-vars */
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdminSignOut, GetMeWithToken, LoginIn } from "@/services/iam";
import { redirect } from "next/navigation";

export const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: DEFAULT_SIGNIN_PATH,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, _) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) return null;

          const response = await LoginIn({
            payload: {
              email,
              password,
              loginProvider: "credentials",
              deviceId: "chrome", //TODO
            },
          });

          if (response?.data?.accessToken) {
            const user = await GetMeWithToken(response?.data?.accessToken);
            if (user?.data) {
              return {
                id: user?.data?.publicId,
                name: `${user?.data?.firstName} ${user?.data?.lastName}`,
                email: user?.data?.email,
                image: user?.data?.imageUrl,
                ...response?.data,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      return token;
    },
  },
  events: {
    async signOut({ token }) {
      // Call backend to revoke session
      if (token?.accessToken) {
        try {
          await AdminSignOut();
          redirect(DEFAULT_SIGNIN_PATH);
        } catch (error) {
          console.error("Failed to revoke session on backend:", error);
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
