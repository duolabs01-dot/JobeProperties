import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin";
import { createServerClient, createServiceRoleClient, type WaitingListRow } from "@/lib/supabase";

const waitingListUpdateSchema = z.object({
  entry_id: z.string().uuid("Invalid waiting list entry id"),
  status: z.enum(["new", "contacted", "qualified", "archived"]),
});

export async function PATCH(request: Request) {
  try {
    const payload = waitingListUpdateSchema.parse(await request.json());
    const authClient = await createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ success: false, message: "Not authorised." }, { status: 403 });
    }

    const supabase = createServiceRoleClient();
    const { data: existingEntryData } = await supabase
      .from("waiting_list")
      .select("*")
      .eq("id", payload.entry_id)
      .maybeSingle();
    const existingEntry = existingEntryData as WaitingListRow | null;

    if (!existingEntry) {
      return NextResponse.json({ success: false, message: "Entry not found." }, { status: 404 });
    }

    const contactedAt =
      payload.status === "contacted" || payload.status === "qualified"
        ? existingEntry.contacted_at ?? new Date().toISOString()
        : existingEntry.contacted_at;

    const { error } = await supabase
      .from("waiting_list")
      .update({
        status: payload.status,
        contacted_at: contactedAt,
      } as never)
      .eq("id", payload.entry_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Waiting list status updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Couldn't update waiting list entry.",
      },
      { status: 400 },
    );
  }
}
