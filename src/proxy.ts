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
    if (redirectTo?.startsWith("/admin")) {
      // Admin gate is enforced server-side in /admin/layout.tsx (env + DB).
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    // Auto-route the env super-admin to /admin even without an explicit
    // redirectTo. DB-promoted admins still land on /portal and click through.
    if (isAdminEmail(user.email)) {
      return NextResponse.redirect(new URL("/admin", request.url));
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

  // Admin role check is performed in /admin/layout.tsx so the DB-promoted role
  // is honoured. Middleware only ensures authentication for /admin paths.

  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
