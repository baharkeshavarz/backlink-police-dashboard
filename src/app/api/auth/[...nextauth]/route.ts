/* eslint-disable @typescript-eslint/no-unused-vars */
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdminSignOut, GetMeWithToken, LoginIn } from "@/services/iam";
import { redirect } from "next/navigation";

const handler = NextAuth({
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
        deviceId: { type: "text" },
        rememberMe: { label: "Remember Me", type: "boolean" },
      },
      async authorize(credentials, _) {
        try {
          const { email, password, deviceId, rememberMe } = credentials || {};
          if (!email || !password) return null;

          const response = await LoginIn({
            payload: {
              email,
              password,
              loginProvider: "credentials",
              deviceId,
            },
          });

          if (response?.data?.accessToken) {
            const user = await GetMeWithToken(response?.data?.accessToken);
            if (user?.data) {
              const maxAge =
                rememberMe === "true" ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
              return {
                id: user?.data?.email,
                name: `${user?.data?.firstName} ${user?.data?.lastName}`,
                email: user?.data?.email,
                image: user?.data?.imageUrl,
                maxAge, // in seconds
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
    // async session({ session, token }) {
    //   console.log("session in jwt token", token);
    //   console.log("session in jwt session", session);

    //   if (token) {
    //     session.user.id = token.sub as string;
    //     session.expires = new Date(
    //       Date.now() + user.maxAge * 1000
    //     ).toISOString();
    //     return session;
    //   }
    //   return session;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        // token.maxAge = user?.maxAge;
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
