import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({
    isAdmin: isAdminEmail(user?.email),
  });
}
