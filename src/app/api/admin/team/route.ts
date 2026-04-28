import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin, isSuperAdmin, logAdminAction } from "@/lib/admin";
import { createServerClient, createServiceRoleClient } from "@/lib/supabase";

const roleUpdateSchema = z.object({
  user_id: z.string().uuid("Invalid user id"),
  role: z.enum(["tenant", "admin", "partner", "lead"]),
});

export async function PATCH(request: Request) {
  try {
    const payload = roleUpdateSchema.parse(await request.json());
    const authClient = await createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    // Only the env super-admin can change roles. DB admins can do everything
    // else but cannot promote others — prevents privilege escalation if a DB
    // admin's account is compromised.
    if (!user || !(await isAdmin(user)) || !isSuperAdmin(user)) {
      return NextResponse.json(
        { success: false, message: "Only the super-admin can change roles." },
        { status: 403 },
      );
    }

    if (payload.user_id === user.id) {
      return NextResponse.json(
        { success: false, message: "You can't change your own role." },
        { status: 400 },
      );
    }

    const supabase = createServiceRoleClient();
    const { data: rawTargetData } = await supabase
      .from("profiles")
      .select("id, email, role")
      .eq("id", payload.user_id)
      .maybeSingle();
    const targetData = rawTargetData as { id: string; email: string | null; role: string } | null;

    if (!targetData) {
      return NextResponse.json(
        { success: false, message: "Profile not found." },
        { status: 404 },
      );
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role: payload.role } as never)
      .eq("id", payload.user_id);

    if (error) throw error;

    await logAdminAction({
      actor: user,
      action: payload.role === "admin" ? "promote_to_admin" : `set_role_${payload.role}`,
      targetUserId: payload.user_id,
      targetEmail: targetData.email,
      metadata: { previous_role: targetData.role, new_role: payload.role },
    });

    return NextResponse.json({ success: true, message: "Role updated." });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Couldn't update role.",
      },
      { status: 400 },
    );
  }
}
