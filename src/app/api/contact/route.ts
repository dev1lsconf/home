import { NextResponse } from "next/server";

/**
 * POST /api/contact — stub endpoint.
 * Validates the payload and returns 200.
 *
 * To go live: swap the console.info for Resend / Formspree / your own
 * mail transport. Keep the response contract: { ok: boolean, error? }.
 */

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const isStr = (v: unknown): v is string => typeof v === "string";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!isStr(name) || name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!isStr(email) || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!isStr(message) || message.trim().length < 10) {
    return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 });
  }

  // TODO(eric): connect Resend/Formspree here.
  console.info("[contact] new message", {
    name: name.trim(),
    email: email.trim(),
    length: message.trim().length,
  });

  return NextResponse.json({ ok: true });
}
