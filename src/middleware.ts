import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/libs/auth";
console.log("teste");

export const config = {
  matcher: [
    "/home/:path*",
    "/files/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
  // if (!isAuthenticated(request)) {
  // }

  // return NextResponse.next();
}
