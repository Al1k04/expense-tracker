import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  // Retrieves and decrypts the JWT automatically
  const sessionToken = req.cookies.get("authjs.session-token")?.value;
  const isLoggedIn = !!sessionToken;

  // console.log(token);
  console.log("cookies:", req.cookies.getAll());

  const { pathname } = req.nextUrl;

  // Protect dashboard routes
  const isProtectedRoute = [
    "/",
    "/expenses",
    "/trips",
    "/settings",
    "/about",
  ].includes(pathname);

  const isAuthRoute = pathname === "/login" || pathname === "/signUp";

  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Limit the middleware to specific paths
export const config = {
  matcher: ["/:path*"],
};
