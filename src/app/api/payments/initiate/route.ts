import { NextResponse } from "next/server";
import { buildPayfastRedirect } from "@/lib/payfast";
import { createServerClient, type PaymentRow, type TenantRow, type UnitRow } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
    }

    const { data: tenantData } = await supabase
      .from("tenants")
      .select("*")
      .eq("auth_user_id", user.id)
      .maybeSingle();
    const tenant = tenantData as TenantRow | null;

    if (!tenant) {
      return NextResponse.json({ message: "Tenant account not linked yet." }, { status: 404 });
    }

    const [{ data: paymentData }, { data: unitData }] = await Promise.all([
      supabase
        .from("payments")
        .select("*")
        .eq("tenant_id", tenant.id)
        .in("status", ["pending", "overdue"])
        .order("due_date", { ascending: true })
        .limit(1)
        .maybeSingle(),
      tenant.unit_id ? supabase.from("units").select("*").eq("id", tenant.unit_id).maybeSingle() : Promise.resolve({ data: null }),
    ]);
    const payment = paymentData as PaymentRow | null;
    const unit = unitData as UnitRow | null;

    if (!payment) {
      return NextResponse.json({ message: "No pending payment found." }, { status: 404 });
    }

    if (!unit) {
      return NextResponse.json({ message: "Unit not linked to this tenant." }, { status: 404 });
    }

    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE;
    const publicUrl = process.env.NEXT_PUBLIC_URL;

    if (!merchantId || !merchantKey || !publicUrl) {
      return NextResponse.json({ message: "PayFast environment variables are missing." }, { status: 500 });
    }

    const fields = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      amount: Number(payment.amount).toFixed(2),
      item_name: `Rent - ${unit.unit_number} - ${payment.due_date}`,
      return_url: `${publicUrl}/portal?paid=true`,
      cancel_url: `${publicUrl}/portal`,
      notify_url: `${publicUrl}/api/payments/notify`,
      custom_str1: payment.id,
      m_payment_id: payment.id,
    };

    const redirect = buildPayfastRedirect(fields, passphrase);

    return NextResponse.json({
      url: redirect.url,
      params: Object.fromEntries(
        Object.entries(redirect.params).map(([key, value]) => [key, String(value ?? "")]),
      ),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Couldn't start PayFast checkout.",
      },
      { status: 400 },
    );
  }
}
