import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyOwner } from "@/lib/notifications";

const maintenanceSchema = z.object({
  name: z.string().min(2),
  unit: z.string().min(2),
  phone: z.string().min(7),
  issue: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const payload = maintenanceSchema.parse(await request.json());

    await notifyOwner({
      subject: `Maintenance request · ${payload.unit}`,
      headline: `New maintenance request from ${payload.name}`,
      lines: [
        `Unit: ${payload.unit}`,
        `Phone: ${payload.phone}`,
        `Issue: ${payload.issue}`,
      ],
    });

    return NextResponse.json({
      message: "Thanks. We've got your maintenance request.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Couldn't send your maintenance request. Try again.",
      },
      { status: 400 },
    );
  }
}
