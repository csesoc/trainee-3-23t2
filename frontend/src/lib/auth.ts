import { post, get } from "@/util/request";
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
        const user = await get(`/user/${res.userId}`, {}, {
          authorization: res.token,
          id: res.userId
        });
        return {
          token: res.token,
          id: user.userId,
          username: user.username,
          profilePicture: user.profilePicture
        };
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
            authorization: token.token,
            username: token.username,
            profilePicture: token.profilePicture
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
          id: userData.id,
          token: userData.token,
          username: userData.username,
          profilePicture: userData.profilePicture
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
