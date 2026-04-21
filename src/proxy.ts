import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { createProxyClient } from "@/lib/supabase";

function isPortalPath(pathname: string) {
  return pathname === "/portal" || pathname.startsWith("/portal/");
}

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isProtectedPath(pathname: string) {
  return isPortalPath(pathname) || isAdminPath(pathname);
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPortalLogin = pathname === "/portal/login";
  const redirectTo = request.nextUrl.searchParams.get("redirectTo");

  const response = NextResponse.next({
    request,
  });

  const supabase = createProxyClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPortalLogin && user) {
    if (redirectTo?.startsWith("/admin") && isAdminEmail(user.email)) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (isProtectedPath(pathname) && !isPortalLogin && !user) {
    const loginUrl = new URL("/portal/login", request.url);

    if (pathname !== "/portal") {
      loginUrl.searchParams.set("redirectTo", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (isAdminPath(pathname) && user && !isAdminEmail(user.email)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
