/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT } from "next-auth/jwt";
import axios from "axios";
import NextAuth, { Account, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { Profile } from "next-auth";

// Ensure you have access to setAccessToken
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              username,
              password,
            },
          );
          if (res.status === 200 && res.data?.data?.user) {
            const data = res.data.data;
            const user = data.user;
            (await cookies()).set("refreshToken", data.refreshToken, {
              maxAge: 60 * 60 * 24,
              httpOnly: true,
            });
            console.log((await cookies()).get("refreshToken"));
            if (user) {
              return user;
            }
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User | null;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
    }) {
      if (user) {
        token.id = user.id_user;
        token.name = user.name;
        token.image = user.image;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name,
        username: token.username,
        image: token.image as string,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
