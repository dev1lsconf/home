"use client";
import { useEffect, useRef, useState } from "react";
import { subscribe, store, type SectionId } from "@/lib/store";
import { content } from "@/lib/content";
import ProgressRail from "./ui/ProgressRail";
import Menu from "./ui/Menu";
import ContactForm from "./ui/ContactForm";

const SECTION_IDS: SectionId[] = [
  "intro", "server", "cables", "network", "skills", "services",
  "experience", "projects", "method", "contact", "final",
];

const PROTOCOLS = ["HTTPS", "TCP/IP", "DNS", "IPv6", "API", "DATABASE", "CLOUD"];

/** Thin progress bar for small screens (rail is hidden < sm). */
function MobileRail() {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  useEffect(
    () =>
      subscribe((s) => {
        if (barRef.current) barRef.current.style.width = `${s.progress * 100}%`;
        if (labelRef.current) labelRef.current.textContent = s.section.toUpperCase();
      }),
    [],
  );
  return (
    <div className="mobile-rail" aria-hidden="true">
      <div ref={barRef} style={{ width: "0%" }} />
      <span ref={labelRef} className="mr-label">INTRO</span>
    </div>
  );
}

/**
 * Overlay — every section's content lives here as real semantic HTML.
 * Visibility is class-toggled from the scroll store (no React re-render
 * per scroll frame — subscription mutates classList directly).
 */
export default function Overlay() {
  const refs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});
  const announceRef = useRef<HTMLSpanElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [rm, setRm] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("reduced-motion", store.reducedMotion);
    return subscribe((s) => {
      // toggle active classes imperatively
      for (const id of SECTION_IDS) {
        const el = refs.current[id];
        if (!el) continue;
        const on = s.reducedMotion || s.section === id;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-hidden", s.reducedMotion ? "false" : on ? "false" : "true");
      }
      if (announceRef.current && announceRef.current.dataset.last !== s.section) {
        announceRef.current.textContent = `Section: ${s.section}`;
        announceRef.current.dataset.last = s.section;
      }
      // dim the 3D scene behind text-heavy sections so content reads cleanly
      const textHeavy = ["skills", "services", "projects", "method", "contact", "experience"].includes(s.section);
      dimRef.current?.classList.toggle("on", textHeavy && !s.reducedMotion);
      // intro: content fades in quickly after a clean "boot" glimpse of the room
      if (introRef.current) {
        const boot = Math.min(1, Math.max(0, (s.progress - 0.004) / 0.012)); // 0 at top, 1 by ~p=0.016
        introRef.current.style.opacity = String(s.reducedMotion ? 1 : boot);
      }
      if (s.reducedMotion !== rm) {
        document.body.classList.toggle("reduced-motion", s.reducedMotion);
        setRm(s.reducedMotion);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRef = (id: SectionId) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  return (
    <>
      <a href="#contact-anchor" className="skip-link">
        Skip to contact
      </a>
      <span ref={announceRef} className="sr-only" aria-live="polite" />
      <div ref={dimRef} className="scene-dim" aria-hidden="true" />
      <MobileRail />
      <ProgressRail />
      <Menu />

      <main id="journey" aria-label="Portfolio journey">
        {/* 00 — INTRO */}
        <section ref={setRef("intro")} className="overlay-section" aria-label="Introduction">
          <div ref={introRef} className="text-center">
            <p className="font-hud text-hud mb-5" style={{ color: "var(--cyan)" }}>SYS.PORTFOLIO // BOOT</p>
            <h1 className="text-display" style={{ color: "var(--ink)" }}>
              {content.name.toUpperCase()}
            </h1>
            <p className="font-hud mt-6" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)", color: "var(--ink)", letterSpacing: "0.22em", fontWeight: 600 }}>
              {content.introRole}
            </p>
            <div className="mt-16 flex justify-center" aria-hidden="true">
              <span className="scroll-hint">
                <span className="hint-text">SCROLL TO EXPLORE</span>
                <span className="hint-caret" />
              </span>
            </div>
          </div>
        </section>

        {/* 01 — SERVER */}
        <section ref={setRef("server")} className="overlay-section" aria-label="Server processing">
          <div className="hud-panel font-hud text-hud max-w-xs"
            style={{ borderLeft: "2px solid var(--cyan)" }}>
            <p className="cyan flex items-center gap-2">
              <span className="pulse-dot" aria-hidden="true" /> REQUEST RECEIVED
            </p>
            <p className="dim mt-2">PROCESSING DATA…</p>
            <p className="mt-2">
              STATUS: <span className="cyan">ONLINE</span>
            </p>
            <p className="dim mt-3" style={{ fontSize: "0.62rem" }}>
              rack-04 · node: edge-bcn-01
            </p>
          </div>
        </section>

        {/* 02 — CABLES */}
        <section ref={setRef("cables")} className="overlay-section" aria-label="Data in transit">
          <div className="w-full max-w-full text-center px-2">
            <p className="font-hud text-hud cyan mb-4">02 // EN TRÁNSITO</p>
            <h2 className="text-title" style={{ fontSize: "clamp(1.05rem, 5vmin, 3rem)", lineHeight: 1.08 }}>
              Transformo ideas complejas en <span className="cyan">productos web que funcionan</span>.
            </h2>
            <p className="text-lead dim mt-4 max-w-xl mx-auto" style={{ fontSize: "clamp(0.92rem, 2.8vmin, 1.35rem)", lineHeight: 1.5 }}>
              No son solo webs: son herramientas que resuelven problemas reales,<br />
              cargan rápido y escalan con tu negocio.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 list-none p-0">
              {PROTOCOLS.map((p) => (
                <li key={p} className="chip">{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 — NETWORK */}
        <section ref={setRef("network")} className="overlay-section" aria-label="Global network">
          <div className="max-w-2xl text-center">
            <p className="font-hud text-hud violet mb-4">03 // LA RED</p>
            <h2 className="text-title mb-6" style={{ fontSize: "clamp(1.8rem, 6.2vmin, 3.6rem)" }}>
              Experiencias que <span className="violet">escalan</span>, del prototipo a producción.
            </h2>
            <p className="text-lead dim mb-4" style={{ fontSize: "clamp(1.25rem, 4vmin, 2rem)", lineHeight: 1.3 }}>
              Desde una API estable hasta una UI que llega rápido —
              me encargo de la <span className="cyan">arquitectura</span>, la{" "}
              <span className="violet">optimización</span> y la entrega.
            </p>
            <p className="font-hud text-hud cyan mt-6" style={{ letterSpacing: "0.18em" }}>
              LLEVEMOS TU PROYECTO AL SIGUIENTE NIVEL
            </p>
          </div>
        </section>

        {/* 04 — SKILLS */}
        <section ref={setRef("skills")} className="overlay-section" aria-label="Technologies">
          <div className="w-full max-w-4xl">
            <p className="font-hud text-hud cyan mb-5">04 // STACK</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {content.skills.map((s) => (
                <div key={s.cat} className="hud-panel">
                  <h3 className="font-hud text-hud violet">{s.cat}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5 list-none p-0">
                    {s.items.map((item) => (
                      <li key={item} className="chip">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — SERVICES */}
        <section ref={setRef("services")} className="overlay-section" aria-label="What I build">
          <div className="w-full max-w-3xl">
            <p className="font-hud text-hud cyan mb-4">05 // LO QUE CONSTRUYO</p>
            <ol className="flex flex-col gap-3 list-none p-0">
              {content.services.map((s, i) => (
                <li key={s.id} className="hud-panel flex items-baseline gap-4">
                  <span className="font-hud text-hud violet shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium tracking-wide text-body">{s.title}</h3>
                    <p className="dim text-body mt-0.5">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 — EXPERIENCE / ABOUT */}
        <section ref={setRef("experience")} className="overlay-section" aria-label="About me">
          <div className="hud-panel max-w-xl text-center mx-auto">
            <p className="font-hud text-hud cyan mb-3">SOBRE MÍ</p>
            <h2 className="text-title font-extralight">{content.name}</h2>
            <p className="font-hud text-hud dim mt-1">
              Full Stack Developer freelance · Based in {content.location}
            </p>
            <p className="text-body mt-4" style={{ color: "var(--ink)" }}>
              {content.bio}
            </p>
            <p className="font-hud text-hud dim mt-4">{content.role}</p>
          </div>
        </section>

        {/* 07 — PROJECTS */}
        <section ref={setRef("projects")} className="overlay-section" aria-label="Projects">
          <div className="w-full max-w-4xl">
            <p className="font-hud text-hud cyan mb-5">07 // PROYECTOS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {content.projects.map((p) => (
                <article key={p.id} className="proj-card">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-body">{p.name}</h3>
                    <span className="font-hud dim" style={{ fontSize: "0.6rem" }}>
                      case study on request
                    </span>
                  </div>
                  <p className="dim text-body mt-2">{p.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — METHOD */}
        <section ref={setRef("method")} className="overlay-section" aria-label="How I work">
          <div className="w-full max-w-2xl">
            <p className="font-hud text-hud violet mb-5">08 // CÓMO TRABAJO</p>
            <ol className="flex flex-col gap-3 list-none p-0">
              {content.method.map((m) => (
                <li key={m.id} className="hud-panel flex items-baseline gap-4">
                  <span className="font-hud cyan text-hud shrink-0">{m.id}</span>
                  <div>
                    <h3 className="font-medium text-body">{m.title}</h3>
                    <p className="dim text-body mt-0.5">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 09 — CONTACT */}
        <section ref={setRef("contact")} className="overlay-section" aria-label="Contact" id="contact-anchor">
          <div className="w-full max-w-2xl">
            <p className="font-hud text-hud cyan mb-3">09 // CONSTRUYAMOS ALGO</p>
            <h2 className="text-title" style={{ fontSize: "clamp(1.15rem, 4.4vmin, 2rem)", lineHeight: 1.15 }}>
              ¿Tienes un proyecto, una idea<br className="hidden sm:inline" /> o un reto técnico?
            </h2>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 mt-5">
              <a className="btn justify-center" href={`mailto:${content.contact.email}`}>CONTACTO</a>
              <a className="btn btn-ghost justify-center" href={content.contact.github} target="_blank" rel="noreferrer">
                GITHUB
              </a>
              <a className="btn btn-ghost justify-center" href={content.contact.linkedin} target="_blank" rel="noreferrer">
                LINKEDIN
              </a>
              <a
                className="btn btn-ghost justify-center"
                href={`mailto:${content.contact.email}?subject=${encodeURIComponent("Solicitud de CV")}`}
              >
                CV
              </a>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* 10 — FINAL */}
        <section ref={setRef("final")} className="overlay-section" aria-label="Closing">
          <div className="final-card text-center">
            <h2 className="text-display">
              {content.name.toUpperCase()}
            </h2>
            <p className="font-hud mt-5" style={{ fontSize: "clamp(1.05rem, 2.6vmin, 1.5rem)", color: "var(--ink)", letterSpacing: "0.2em", fontWeight: 600 }}>
              {content.introRole}
            </p>
            <p className="text-lead dim mt-7 max-w-lg mx-auto" style={{ fontSize: "clamp(1.25rem, 3.6vmin, 2.1rem)", lineHeight: 1.35 }}>
              {content.footer}
            </p>
            <p className="font-hud text-hud dim mt-12" style={{ fontSize: "clamp(0.85rem, 2vmin, 1rem)" }}>
              © {content.year} Eric Batista
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
