"use client";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll-timeline";
import type { SectionId } from "@/lib/store";

const LINKS: { id: SectionId; label: string }[] = [
  { id: "intro", label: "INICIO" },
  { id: "skills", label: "STACK" },
  { id: "services", label: "SERVICIOS" },
  { id: "projects", label: "PROYECTOS" },
  { id: "method", label: "MÉTODO" },
  { id: "contact", label: "CONTACTO" },
];

/** Discreet top-right menu: expands into a minimal overlay. */
export default function Menu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // focus first link on open
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((o) => !o)}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-40 chip"
        style={{ borderColor: open ? "var(--cyan)" : undefined, color: open ? "var(--cyan)" : undefined }}
      >
        <span aria-hidden="true">{open ? "✕" : "≡"}</span> MENÚ
      </button>

      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed inset-0 z-30 grid place-items-center transition-all duration-300"
        style={{
          background: "rgba(5, 6, 10, 0.92)",
          backdropFilter: "blur(14px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav aria-label="Secciones" className="text-center">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection(l.id);
                    setOpen(false);
                  }}
                  className="text-title font-light tracking-wide transition-colors duration-200 hover:text-[var(--cyan)] focus-visible:text-[var(--cyan)]"
                  style={{
                    color: "var(--ink)",
                    transitionDelay: open ? `${i * 40}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center gap-4 font-hud text-hud">
            <a className="chip" href={content.contact.github} target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a className="chip" href={content.contact.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN
            </a>
            <a className="chip" href={`mailto:${content.contact.email}`}>
              EMAIL
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
