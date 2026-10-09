import { NextResponse } from "next/server";

const required = ["service", "property", "urgency", "details", "name", "email", "phone", "area", "time"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  for (const key of required) {
    if (typeof body[key] !== "string" || !(body[key] as string).trim()) {
      return NextResponse.json({ ok: false, error: `Missing field: ${key}` }, { status: 422 });
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(body.email as string)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
  }

  const reference = `Q-${Date.now().toString(36).toUpperCase()}`;

  // TODO: deliver the request. Examples: send an email (Resend, Postmark, SMTP),
  // post to a CRM or Slack webhook, or insert into a database.
  console.log("New quote request", reference, body);

  return NextResponse.json({ ok: true, reference });
}
