/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginIn } from "@/services/iam";

export const handler = NextAuth({
  session: {
    maxAge: 1 * 24 * 60 * 60,
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
            return {
              ...response?.data,
              accessToken: response?.data?.accessToken!,
              refreshToken: response?.data?.refreshToken!,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error("Login error:", err);
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
});

export { handler as GET, handler as POST };
