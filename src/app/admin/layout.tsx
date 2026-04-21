import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isAdminEmail } from "@/lib/admin";
import { createServerClient, createServiceRoleClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login?redirectTo=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  const adminSupabase = createServiceRoleClient();
  const { count: tenantCount } = await adminSupabase
    .from("tenants")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-[color:#f6f2ea] text-[color:var(--ink)] lg:pl-60">
      <AdminSidebar tenantCount={tenantCount ?? 0} adminEmail={user.email ?? "Admin"} />
      <div className="min-h-screen">{children}</div>
    </div>
  );
}
