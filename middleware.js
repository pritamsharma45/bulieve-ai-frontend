import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  // Public routes that don't require authentication
  const publicRoutes = ["/hot-takes", "/news", "/api/auth/creation"];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!auth) {
    return NextResponse.redirect(new URL("/hot-takes", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
