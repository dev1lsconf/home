"use client";
import dynamic from "next/dynamic";
import SceneFallback from "./SceneFallback";

// The 3D scene never blocks SSR of the content — it hydrates client-side.
const SceneRoot = dynamic(() => import("./SceneRoot"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export default function SceneLoader() {
  return <SceneRoot />;
}
