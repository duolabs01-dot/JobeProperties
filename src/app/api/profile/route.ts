import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient, createServiceRoleClient } from "@/lib/supabase";

const profileUpdateSchema = z.object({
  full_name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  avatar_url: z.string().trim().max(500).nullable().optional(),
});

export async function PATCH(request: Request) {
  try {
    const payload = profileUpdateSchema.parse(await request.json());
    const authClient = await createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authenticated." }, { status: 401 });
    }

    const supabase = createServiceRoleClient();

    // Upsert: ensures a row exists even if the trigger missed (older accounts).
    const update: Record<string, unknown> = {};
    if (payload.full_name !== undefined) update.full_name = payload.full_name;
    if (payload.phone !== undefined) update.phone = payload.phone;
    if (payload.avatar_url !== undefined) update.avatar_url = payload.avatar_url;

    const { error: updateError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email ?? null,
          ...update,
        } as never,
        { onConflict: "id" },
      );

    if (updateError) throw updateError;

    // Mirror name/phone into tenants if linked, so admin views stay in sync.
    if (payload.full_name !== undefined || payload.phone !== undefined) {
      const tenantUpdate: Record<string, unknown> = {};
      if (payload.full_name !== undefined) tenantUpdate.full_name = payload.full_name;
      if (payload.phone !== undefined && payload.phone) tenantUpdate.phone = payload.phone;

      if (Object.keys(tenantUpdate).length > 0) {
        await supabase
          .from("tenants")
          .update(tenantUpdate as never)
          .eq("auth_user_id", user.id);
      }
    }

    return NextResponse.json({ success: true, message: "Profile updated." });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Couldn't update profile.",
      },
      { status: 400 },
    );
  }
}
