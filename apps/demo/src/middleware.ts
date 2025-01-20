import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const publicRoutes = ["/Login", "/", "/Signup"];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const token = cookieStore.get("Login");

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/Dashboard", req.url));
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: ["/Dashboard/:path*", "/Dashboard", "/", "/Signup", "/Login"],
};
