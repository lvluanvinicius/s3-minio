import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/libs/auth";
import { FetchError } from "./services/app";
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
  try {
    if (isAuthenticated(request)) {
      return NextResponse.next();
    }

    throw new FetchError("Sua sessão é inválida.", "APIError", 401)
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
