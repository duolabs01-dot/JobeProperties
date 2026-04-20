import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyOwner } from "@/lib/notifications";

const advertiseSchema = z.object({
  businessName: z.string().min(2),
  contactName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  placementInterest: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const payload = advertiseSchema.parse(await request.json());

    await notifyOwner({
      subject: `Advertising enquiry · ${payload.businessName}`,
      headline: `New advertiser lead from ${payload.businessName}`,
      lines: [
        `Contact: ${payload.contactName}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        `Interest: ${payload.placementInterest}`,
      ],
    });

    return NextResponse.json({
      message: "Enquiry sent — the owner now has a structured advertising lead instead of an informal message.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Could not submit your advertising enquiry.",
      },
      { status: 400 },
    );
  }
}
