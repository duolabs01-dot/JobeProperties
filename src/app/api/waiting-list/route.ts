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
      subject: `Waiting list enquiry · ${payload.preferredPhase}`,
      headline: `New waiting list enquiry from ${payload.name}`,
      lines: [
        `Phone: ${payload.phone}`,
        `Preferred phase: ${payload.preferredPhase}`,
        "Source: marketing site waiting list form",
      ],
    });

    return NextResponse.json({
      message: "Thanks — the owner has your details and can follow up with the right phase match.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Could not save your waiting-list enquiry.",
      },
      { status: 400 },
    );
  }
}
