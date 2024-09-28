import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/libs/auth";

console.log("chamando....");

export const config = {
  matcher: [
    "/home",
    "/files/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect("/sign-in");
  }

  return NextResponse.next();
}
