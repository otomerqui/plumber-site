import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, string | undefined>;
  if (!name?.trim() || !message?.trim() || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Name, valid email and message are required" }, { status: 422 });
  }

  // TODO: deliver the message (email provider, CRM, webhook, database).
  console.log("New contact message", body);

  return NextResponse.json({ ok: true });
}
