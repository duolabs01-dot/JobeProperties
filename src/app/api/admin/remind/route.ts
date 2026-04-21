import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail, normaliseSouthAfricanPhone } from "@/lib/admin";
import { formatCurrency, formatDate } from "@/lib/admin-dashboard";
import { createServerClient, createServiceRoleClient, type PaymentRow, type TenantRow, type UnitRow } from "@/lib/supabase";

const remindSchema = z.object({
  payment_id: z.string().uuid("Invalid payment id"),
});

export async function POST(request: Request) {
  try {
    const payload = remindSchema.parse(await request.json());
    const authClient = await createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ success: false, message: "Not authorised." }, { status: 403 });
    }

    const supabase = createServiceRoleClient();
    const { data: paymentData } = await supabase.from("payments").select("*").eq("id", payload.payment_id).maybeSingle();
    const payment = paymentData as PaymentRow | null;

    if (!payment) {
      return NextResponse.json({ success: false, message: "Payment not found." }, { status: 404 });
    }

    const { data: tenantData } = await supabase.from("tenants").select("*").eq("id", payment.tenant_id).maybeSingle();
    const tenant = tenantData as TenantRow | null;

    if (!tenant) {
      return NextResponse.json({ success: false, message: "Tenant not found." }, { status: 404 });
    }

    const { data: unitData } = tenant.unit_id
      ? await supabase.from("units").select("*").eq("id", tenant.unit_id).maybeSingle()
      : { data: null };
    const unit = unitData as UnitRow | null;

    const unitLabel = unit?.unit_number ?? "your unit";
    const portalUrl = `${process.env.NEXT_PUBLIC_URL ?? "https://jobepropco.vercel.app"}/portal`;
    const message = `Hi ${tenant.full_name}, this is a reminder that your rent of ${formatCurrency(Number(payment.amount))} for ${unitLabel} is due on ${formatDate(payment.due_date)}.\nPay online: ${portalUrl}\nReply STOP to unsubscribe.`;

    if (process.env.WASSENGER_API_KEY) {
      const response = await fetch("https://api.wassenger.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: process.env.WASSENGER_API_KEY,
        },
        body: JSON.stringify({
          phone: normaliseSouthAfricanPhone(tenant.phone),
          message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Wassenger rejected the reminder: ${errorText}`);
      }
    } else {
      console.log("[admin:reminder:fallback]", {
        phone: tenant.phone,
        message,
      });
    }

    const remindedAt = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("payments")
      .update({ reminded_at: remindedAt } as never)
      .eq("id", payment.id);

    if (updateError) {
      const missingColumn =
        updateError.message.includes("reminded_at") &&
        (updateError.message.includes("column") || updateError.message.includes("schema cache"));

      if (!missingColumn) {
        throw updateError;
      }

      console.warn("[admin:reminder:update-skipped]", updateError.message);
    }

    return NextResponse.json({
      success: true,
      message: "Reminder sent",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Couldn't send reminder.",
      },
      { status: 400 },
    );
  }
}
