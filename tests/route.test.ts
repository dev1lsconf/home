import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/contact/route";

function req(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("accepts a valid payload", async () => {
    const res = await POST(req({ name: "Jane", email: "jane@example.com", message: "Hello Eric, I have a project." }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
  it("rejects invalid email", async () => {
    const res = await POST(req({ name: "Jane", email: "nope", message: "Hello Eric, I have a project." }));
    expect(res.status).toBe(400);
  });
  it("rejects short message", async () => {
    const res = await POST(req({ name: "Jane", email: "jane@example.com", message: "hi" }));
    expect(res.status).toBe(400);
  });
  it("rejects bad JSON", async () => {
    const res = await POST(req("not-json{"));
    expect(res.status).toBe(400);
  });
});
