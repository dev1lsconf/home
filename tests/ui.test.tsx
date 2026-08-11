import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "@/components/ui/ContactForm";

// fetch mock
const okResponse = () =>
  Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));

describe("ContactForm", () => {
  it("validates email client-side and announces the error", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bad" } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "A real message here." } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("submits valid data and shows success", async () => {
    global.fetch = () => okResponse() as Promise<Response>;
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "A real message here." } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/message sent/i)).toBeInTheDocument(),
    );
  });
});
