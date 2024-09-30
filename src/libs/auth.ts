import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest) {
  console.log(request);

  return true;
}
