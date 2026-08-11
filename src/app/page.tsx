import Overlay from "@/components/Overlay";
import Providers from "@/components/Providers";
import SceneLoader from "@/components/SceneLoader";

export default function Home() {
  return (
    <>
      <Providers />
      <SceneLoader />
      <Overlay />
    </>
  );
}
