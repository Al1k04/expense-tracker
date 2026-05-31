import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const middleware = auth((req) => {
  console.log("middleware running");
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const isProtectedRoute = [
    "/",
    "/expenses",
    "/trips",
    "/settings",
    "/about",
  ].includes(pathname);

  const isAuthRoute = ["/login", "/signUp"].includes(pathname);

  if (isAuthRoute) return NextResponse.next();

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
