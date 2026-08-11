"use client";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Contact form — full client validation, POSTs to /api/contact (stub ready
 * for Resend/Formspree). All states announced via aria-live.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    const errs: typeof errors = {};
    if (data.name.length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errs.email = "Please enter a valid email.";
    if (data.message.length < 10) errs.message = "Message should be at least 10 characters.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      setServerMsg("Please fix the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setServerMsg("Message sent. I'll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setServerMsg("Could not send right now — try email instead: ericbatista@gmail.com");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(10, 14, 20, 0.6)",
    border: "1px solid var(--line)",
    borderRadius: 4,
    color: "var(--ink)",
    padding: "0.7rem 0.85rem",
    width: "100%",
    fontSize: "0.9rem",
  };

  const errStyle: React.CSSProperties = { color: "#ff8b8b", fontSize: "0.72rem", marginTop: 4 };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full flex flex-col gap-3"
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="cf-name" className="font-hud text-hud dim block mb-1">
          NAME
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          style={{ ...inputStyle, borderColor: errors.name ? "#ff8b8b" : inputStyle.borderColor }}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          required
        />
        {errors.name && (
          <p id="cf-name-err" style={errStyle} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className="font-hud text-hud dim block mb-1">
          EMAIL
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          style={{ ...inputStyle, borderColor: errors.email ? "#ff8b8b" : inputStyle.borderColor }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          required
        />
        {errors.email && (
          <p id="cf-email-err" style={errStyle} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-msg" className="font-hud text-hud dim block mb-1">
          MESSAGE
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={4}
          style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#ff8b8b" : inputStyle.borderColor }}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-msg-err" : undefined}
          required
        />
        {errors.message && (
          <p id="cf-msg-err" style={errStyle} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn mt-1 self-start" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
        <span aria-hidden="true">→</span>
      </button>

      <p
        aria-live="polite"
        className="font-hud text-hud"
        style={{ color: status === "success" ? "var(--cyan)" : status === "error" ? "#ff8b8b" : "var(--dim)", minHeight: "1.2em" }}
      >
        {serverMsg}
      </p>
    </form>
  );
}
