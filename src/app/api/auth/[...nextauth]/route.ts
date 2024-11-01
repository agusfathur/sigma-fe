/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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
    async jwt({ token, user }: any) {
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
    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        id: token.id || null,
        name: token.name || null,
        username: token.username || null,
        image: token.image || null,
        email: token.email || null,
        role: token.role || null,
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
