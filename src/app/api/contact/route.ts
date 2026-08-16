import { NextResponse } from "next/server";

/**
 * POST /api/contact — validates payload and forwards to Formspree.
 * Returns { ok: boolean, error?: string }.
 */

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const isStr = (v: unknown): v is string => typeof v === "string";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

export async function POST(req: Request) {
  if (!FORMSPREE_ENDPOINT) {
    console.error("[contact] FORMSPREE_ENDPOINT not configured");
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration" },
      { status: 500 }
    );
  }

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

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _replyto: email.trim(),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[contact] Formspree error:", res.status, errText);
      return NextResponse.json(
        { ok: false, error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
