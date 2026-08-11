import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";
import { store, setProgress, subscribe, setSection, setQuality } from "@/lib/store";
import { detectQuality } from "@/lib/quality";
import { sectionAt, sampleCam, TIMELINE } from "@/lib/scroll-timeline";

describe("content model", () => {
  it("has 4 real projects", () => {
    expect(content.projects).toHaveLength(4);
    expect(content.projects[0].name).toContain("Batista Doleo");
  });
  it("has 5 services", () => expect(content.services).toHaveLength(5));
  it("has 4 methodology steps", () => expect(content.method).toHaveLength(4));
  it("has 9 skill categories", () => expect(content.skills).toHaveLength(9));
  it("has contact links", () => {
    expect(content.contact.email).toBe("ericbatista@gmail.com");
    expect(content.contact.github).toContain("github.com");
    expect(content.contact.linkedin).toContain("linkedin.com");
  });
});

describe("scroll store", () => {
  it("clamps progress 0..1 and notifies subscribers", () => {
    let seen = -1;
    const off = subscribe((s) => {
      seen = s.progress;
    });
    setProgress(1.7);
    expect(store.progress).toBe(1);
    expect(seen).toBe(1);
    setProgress(-2);
    expect(store.progress).toBe(0);
    off();
  });
  it("tracks section + quality changes", () => {
    setSection("network");
    expect(store.section).toBe("network");
    setQuality("low");
    expect(store.quality).toBe("low");
    setQuality("high");
    setSection("intro");
  });
});

describe("quality engine", () => {
  it("returns fallback with no WebGL", () => {
    expect(detectQuality({ webgl: false })).toBe("fallback");
  });
  it("returns low on mobile", () => {
    expect(detectQuality({ webgl: true, mobile: true })).toBe("low");
  });
  it("returns high on capable desktop", () => {
    expect(detectQuality({ webgl: true, mobile: false, deviceMemory: 8, cores: 8 })).toBe("high");
  });
  it("returns medium on weaker desktop", () => {
    expect(detectQuality({ webgl: true, mobile: false, deviceMemory: 4, cores: 2 })).toBe("medium");
  });
  it("force override wins", () => {
    expect(detectQuality({ webgl: false }, "high")).toBe("high");
  });
});

describe("camera timeline", () => {
  it("has 11 ordered keyframes covering [0,1]", () => {
    expect(TIMELINE).toHaveLength(11);
    expect(TIMELINE[0].at[0]).toBe(0);
    expect(TIMELINE[10].at[1]).toBe(1);
    for (let i = 1; i < TIMELINE.length; i++) {
      expect(TIMELINE[i].at[0]).toBeGreaterThanOrEqual(TIMELINE[i - 1].at[1]);
    }
  });
  it("maps progress to sections", () => {
    expect(sectionAt(0)).toBe("intro");
    expect(sectionAt(0.1)).toBe("server");
    expect(sectionAt(0.35)).toBe("network");
    expect(sectionAt(0.9)).toBe("contact");
    expect(sectionAt(1)).toBe("final");
  });
  it("samples camera continuously across boundaries", () => {
    const a = sampleCam(0.05);
    const b = sampleCam(0.055);
    const c = sampleCam(0.06);
    // positions must move smoothly (no teleport between adjacent samples)
    const d1 = Math.abs(b.pos[2] - a.pos[2]);
    const d2 = Math.abs(c.pos[2] - b.pos[2]);
    expect(d1).toBeLessThan(2);
    expect(d2).toBeLessThan(2);
  });
});
