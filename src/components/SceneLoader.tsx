"use client";
import dynamic from "next/dynamic";

// SceneRoot loads client-side. While it loads: nothing renders in its place —
// the page overlays show your content from the first paint.
const SceneRoot = dynamic(() => import("./SceneRoot"), {
  ssr: false,
  loading: () => null,
});

export default function SceneLoader() {
  return <SceneRoot />;
}
