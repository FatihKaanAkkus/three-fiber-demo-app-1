import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, Mesh, ShaderMaterial } from "three";
import { AbstractShape } from "../models/AbstractShape";
import { WatercolorShaderUniforms } from "../shaders/WatercolorShaderMaterial";

interface WatercolorMesh extends Mesh {
  material: ShaderMaterial & WatercolorShaderUniforms;
}

export default function AbstractComponent() {
  const mesh = useRef<WatercolorMesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.material.time = clock.getElapsedTime();
    }
  });

  return (
    <AbstractShape ref={mesh}>
      <meshBasicMaterial />
      <watercolorShaderMaterial time={0} color={new Color(0.4, 0.6, 0.1)} />
    </AbstractShape>
  );
}
