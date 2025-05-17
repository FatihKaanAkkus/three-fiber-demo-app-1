import { PerspectiveCamera } from "@react-three/drei";
import { type ColorRepresentation } from "three";

export function Common({ color }: { color: ColorRepresentation }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 15, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  );
}
