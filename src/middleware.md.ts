import { NextResponse, type NextRequest } from "next/server";
import { FetchError, get } from "./services/app";

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
    const cookies = request.headers.get("cookie");

    await get(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user`, {
      headers: {
        Accept: "application/json",
        cookie: cookies as string,
      },
    });

    return NextResponse.next();

    // throw new FetchError("Sua sessão é inválida.", "APIError", 401);
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(new URL("/error", request.url));
  }
}
