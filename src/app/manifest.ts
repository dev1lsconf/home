import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eric Batista — Developer · Web · AI · Infrastructure",
    short_name: "Eric Batista",
    description:
      "Full Stack Developer freelance & Next.js Specialist based in Barcelona. Diseño y código donde cada píxel importa.",
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#05060a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
