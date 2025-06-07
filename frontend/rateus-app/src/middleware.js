import { NextResponse } from "next/server";
import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "./constants/profile-pages";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const user = await getToken({ req, secret });

  const isAuth = !!user;

  // Direct to organizations page

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/organizations", req.url));
  }

  // If is already authenticated
  const isAuthPath = pathname.startsWith("/auth");

  if (isAuthPath && isAuth) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // If is not authenticated
  const isProfilePath = pathname.startsWith("/profile");

  const isProtectedPath = isProfilePath; // in future use with "...  otherPath  otherPath ...""

  if (isProtectedPath && !isAuth) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // If profile path
  if (isProfilePath) {
    const profilePage = pathname.split("/").filter(Boolean)[1] || "";
    const userRole = user?.role;
    const userAvailablePages = PROFILE_PAGE_AUTHORITIES[userRole];

    if (
      !userAvailablePages?.includes(profilePage) &&
      !Object.values(PROFILE_COMMON_PAGE).includes(profilePage)
    ) {
      return NextResponse.redirect(
        new URL(`/profile/${userAvailablePages?.[0]}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/", "/profile/:path*", "/auth/:path*"],
};
