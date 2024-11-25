/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// declare ulang type dari session
declare module "next-auth" {
  // type session user sekarang digabungkan
  // user[role] dan default session user
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    id_user: string;
    username: string;
    role: string;
  }
}

// declare ulang type dari jwt
// ditambahkan role
declare module "next-auth/jwt" {
  interface JWT {
    // sebelumnya sub opsional, sekarang sub wajib
    sub: string;
    username: string;
    role: string;
  }
}
