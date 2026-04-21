import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase";
import { notifyOwner } from "@/lib/notifications";

const waitingListSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  preferredPhase: z.string().min(3),
  preferredUnitType: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const payload = waitingListSchema.parse(await request.json());
    const supabase = createServiceRoleClient();

    const { error } = await supabase.from("waiting_list").insert({
      full_name: payload.name,
      phone: payload.phone,
      preferred_phase: payload.preferredPhase,
      preferred_unit_type: payload.preferredUnitType ?? null,
      notes: payload.notes ?? null,
      status: "new",
    } as never);

    if (error) {
      throw error;
    }

    await notifyOwner({
      subject: `Availability enquiry · ${payload.preferredPhase}`,
      headline: `New availability enquiry from ${payload.name}`,
      lines: [
        `Phone: ${payload.phone}`,
        `Preferred location: ${payload.preferredPhase}`,
        payload.preferredUnitType ? `Preferred unit type: ${payload.preferredUnitType}` : "",
        payload.notes ? `Notes: ${payload.notes}` : "",
        "Source: availability form",
      ].filter(Boolean),
    });

    return NextResponse.json({
      message: "Thanks. We'll call when a unit opens in your preferred location.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Couldn't save your details. Try again.",
      },
      { status: 400 },
    );
  }
}
