import { NextResponse, type NextRequest } from "next/server";
import { createProxyClient } from "@/lib/supabase";

function isProtectedPath(pathname: string) {
  return pathname === "/portal" || pathname.startsWith("/portal/") || pathname === "/admin" || pathname.startsWith("/admin/");
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPortalLogin = pathname === "/portal/login";

  const response = NextResponse.next({
    request,
  });

  const supabase = createProxyClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPortalLogin && user) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (isProtectedPath(pathname) && !isPortalLogin && !user) {
    const loginUrl = new URL("/portal/login", request.url);

    if (pathname !== "/portal") {
      loginUrl.searchParams.set("redirectTo", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
