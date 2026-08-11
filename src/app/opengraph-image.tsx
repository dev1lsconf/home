import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Eric Batista — Developer · Web · AI · Infrastructure";

/**
 * OG image — dark datacenter aesthetic, generated on-demand at the edge.
 */
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #05060a 0%, #0a0f18 55%, #05060a 100%)",
          padding: 72,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* faint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(82,230,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(82,230,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* cyan accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#52e6ff" }} />
        {/* top row: sys tag */}
        <div style={{ display: "flex", color: "#52e6ff", fontSize: 24, letterSpacing: 6, fontFamily: "monospace" }}>
          SYS.PORTFOLIO // 2026
        </div>
        {/* center: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, color: "#e8edf4", letterSpacing: -2, lineHeight: 0.95 }}>
            ERIC BATISTA
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#52e6ff", letterSpacing: 8, fontFamily: "monospace" }}>
            Developer · Web · AI · Infrastructure
          </div>
        </div>
        {/* bottom: url + node lights */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#8b98a5", fontFamily: "monospace" }}>
            ericbatista.vercel.app
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["#52e6ff", "#8b6bff", "#52e6ff"].map((c, i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: c, boxShadow: `0 0 18px ${c}` }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
