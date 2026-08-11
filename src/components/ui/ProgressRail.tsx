"use client";
import { useEffect, useState } from "react";
import { subscribe, store, type SectionId } from "@/lib/store";
import { scrollToSection } from "@/lib/scroll-timeline";

const STOPS: { id: SectionId; label: string; num: string }[] = [
  { id: "server", num: "01", label: "SERVER" },
  { id: "cables", num: "02", label: "NETWORK" },
  { id: "network", num: "03", label: "DATA" },
  { id: "skills", num: "04", label: "SKILLS" },
  { id: "services", num: "05", label: "SERVICES" },
  { id: "experience", num: "06", label: "EXPERIENCE" },
  { id: "projects", num: "07", label: "PROJECTS" },
  { id: "method", num: "08", label: "METHOD" },
  { id: "contact", num: "09", label: "CONTACT" },
];

/** Left-edge journey rail: where you are in the story + jump navigation. */
export default function ProgressRail() {
  const [section, setSection] = useState<SectionId>(store.section);
  const [progress, setLocalProgress] = useState(0);

  useEffect(
    () =>
      subscribe((s) => {
        setSection(s.section);
        setLocalProgress(s.progress);
      }),
    [],
  );

  const activeIdx = STOPS.findIndex((s) => s.id === section);

  return (
    <nav
      aria-label="Journey progress"
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-1"
    >
      {/* progress track */}
      <div
        className="absolute left-[3px] top-0 bottom-0 w-px"
        style={{ background: "var(--line)" }}
        aria-hidden="true"
      >
        <div
          className="w-px origin-top"
          style={{
            background: "var(--cyan)",
            height: `${progress * 100}%`,
            boxShadow: "0 0 8px var(--cyan-soft)",
            transition: "height 0.2s linear",
          }}
        />
      </div>

      <ul className="flex flex-col gap-2.5 pl-0">
        {STOPS.map((s, i) => {
          const active = i === activeIdx || (activeIdx === -1 && i === 0 && section === "intro");
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToSection(s.id)}
                aria-current={active ? "true" : undefined}
                aria-label={`Go to ${s.label}`}
                className="group flex items-center gap-2.5 text-left"
              >
                <span
                  className="block w-[7px] h-[7px] rounded-full transition-all duration-300"
                  style={{
                    background: active ? "var(--cyan)" : "transparent",
                    border: `1px solid ${active ? "var(--cyan)" : "var(--line)"}`,
                    boxShadow: active ? "0 0 10px var(--cyan-soft)" : "none",
                  }}
                />
                <span
                  className="font-hud text-hud transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ color: active ? "var(--cyan)" : "var(--dim)", opacity: active ? 1 : undefined }}
                >
                  <span className="dim">{s.num}</span> {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
