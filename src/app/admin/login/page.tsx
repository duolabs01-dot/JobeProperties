import { redirect } from "next/navigation";

/**
 * Convenience entry point for staff. /admin/login → portal login with the
 * post-login redirect already pointing back at /admin. After signing in,
 * admins land on /admin; non-admins are bounced to / by the admin layout.
 */
export default function AdminLoginPage() {
  redirect("/portal/login?redirectTo=/admin&as=admin");
}
