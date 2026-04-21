import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin";
import { createServerClient, createServiceRoleClient } from "@/lib/supabase";

const maintenanceUpdateSchema = z.object({
  request_id: z.string().uuid("Invalid request id"),
  status: z.enum(["open", "in_progress", "resolved"]),
});

export async function PATCH(request: Request) {
  try {
    const payload = maintenanceUpdateSchema.parse(await request.json());
    const authClient = await createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ success: false, message: "Not authorised." }, { status: 403 });
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase
      .from("maintenance_requests")
      .update({ status: payload.status } as never)
      .eq("id", payload.request_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Maintenance status updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Couldn't update maintenance request.",
      },
      { status: 400 },
    );
  }
}
