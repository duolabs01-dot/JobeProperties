import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyOwner } from "@/lib/notifications";

const waitingListSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  preferredPhase: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const payload = waitingListSchema.parse(await request.json());

    await notifyOwner({
      subject: `Availability enquiry · ${payload.preferredPhase}`,
      headline: `New availability enquiry from ${payload.name}`,
      lines: [
        `Phone: ${payload.phone}`,
        `Preferred phase: ${payload.preferredPhase}`,
        "Source: availability form",
      ],
    });

    return NextResponse.json({
      message: "Thanks. We'll call when a unit opens in your preferred phase.",
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
