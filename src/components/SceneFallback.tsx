import { store } from "@/lib/store";

/**
 * SceneFallback — intentional 2D cinematic mode for devices without WebGL
 * (or after a GL crash). CSS gradients + grid + SVG cables with traveling
 * data pulses. Not an error screen — a design variant.
 */
export default function SceneFallback() {
  const rm = store.reducedMotion;
  return (
    <div
      data-testid="scene-fallback"
      className="scene-layer"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(82,230,255,0.08), transparent 60%)," +
          "radial-gradient(ellipse 60% 50% at 80% 10%, rgba(139,107,255,0.07), transparent 60%)," +
          "linear-gradient(#05060a, #070a10)",
      }}
    >
      {/* perspective grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,180,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,180,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      {/* cables with traveling pulses */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="cb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#52e6ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#52e6ff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#8b6bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -2 ${70 + i * 8} C 30 ${50 + i * 10}, 60 ${86 - i * 6}, 102 ${60 + i * 12}`}
            fill="none"
            stroke="url(#cb)"
            strokeWidth="0.35"
            strokeDasharray={rm ? "none" : "3 5"}
          >
            {!rm && (
              <animate
                attributeName="stroke-dashoffset"
                from="80"
                to="0"
                dur={`${4 + i * 1.5}s`}
                repeatCount="indefinite"
              />
            )}
          </path>
        ))}
      </svg>
      <p
        className="font-hud text-hud absolute bottom-5 left-1/2 -translate-x-1/2"
        style={{ color: "var(--dim)" }}
      >
        CINEMATIC MODE · 2D
      </p>
    </div>
  );
}
