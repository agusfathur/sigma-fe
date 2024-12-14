import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role: string = token?.role || "";

  const { pathname } = request.nextUrl;

  if (!token) {
    if (pathname === "/") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check the role of the user from the token

  if (token && pathname === "/") {
    if (role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url)); // Redirect to /user if not admin
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url)); // Redirect to /admin if not user
    }
  }

  // Restrict access to /admin for users with the 'admin' role only
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url)); // Redirect to /user if not admin
  }

  // Restrict access to /user for users with the 'user' role only
  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url)); // Redirect to /admin if not user
  }

  // Jika refreshToken ada, izinkan akses ke route
  return NextResponse.next();
}

// Konfigurasi middleware
export const config = {
  matcher: ["/", "/admin/:path*", "/user/:path*"], // Middleware untuk path tertentu
};
