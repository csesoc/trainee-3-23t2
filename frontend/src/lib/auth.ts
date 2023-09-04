import { post } from "@/util/request";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      async authorize(credentials) {
        const res = await post("/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        });
        if (res.errorCode) {
          return null;
        }
        return res;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            authorization: token.token
          }
        };
      }
      return token;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const userData = user as any;
        return {
          ...token,
          id: userData.userId,
          token: userData.token
        }
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/login"
  }
};
