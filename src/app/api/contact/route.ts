import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  console.log("[contact]", payload);

  return NextResponse.json({ success: true });
}
