import { NextResponse } from "next/server";
import { validatePayfastSignature } from "@/lib/payfast";
import { createServiceRoleClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const params = Object.fromEntries(new URLSearchParams(body).entries());

    if (!validatePayfastSignature(params, process.env.PAYFAST_PASSPHRASE)) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 400 });
    }

    if (params.payment_status === "COMPLETE" && params.custom_str1) {
      const supabase = createServiceRoleClient();
      const paidAt = new Date().toISOString();
      const { error } = await supabase
        .from("payments")
        .update({
          status: "paid",
          paid_at: paidAt,
          gateway: "payfast",
          gateway_reference: params.pf_payment_id ?? null,
        } as never)
        .eq("id", params.custom_str1);

      if (error) {
        throw error;
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Couldn't process PayFast notification.",
      },
      { status: 400 },
    );
  }
}
