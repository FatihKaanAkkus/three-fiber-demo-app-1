import { useLayoutEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Color,
  ColorRepresentation,
  Mesh,
  ShaderMaterial,
  TextureLoader,
  Vector2,
} from "three";
import { CustomShaderUniforms } from "../shaders/custom";
import stock1Img from "/assets/images/stock-1.jfif";
import stock2Img from "/assets/images/stock-2.jfif";
import { Box } from "@react-three/drei";
import { damp2 } from "maath/easing";

interface FlowmapMesh extends Mesh {
  material: ShaderMaterial & CustomShaderUniforms;
}

export default function AbstractComponent({
  color = new Color(0.4, 0.6, 0.1),
}: {
  color?: ColorRepresentation;
}) {
  const mesh = useRef<FlowmapMesh>(null);
  const texture = useLoader(TextureLoader, stock1Img);
  const textureHover = useLoader(TextureLoader, stock2Img);
  const size = useThree((state) => state.size);

  const prevMouse = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));
  const scale = useRef(new Vector2(0, 0));

  useLayoutEffect(() => {
    if (mesh.current) {
      mesh.current.material.uTime = 0;
      mesh.current.material.uResolution.set(
        size.width * window.devicePixelRatio,
        size.height * window.devicePixelRatio
      );
    }
  }, [size]);

  useFrame(({ pointer }, delta) => {
    if (mesh.current) {
      mesh.current.material.uTime += delta;
      mesh.current.material.uMouse.set(pointer.x, pointer.y);

      scale.current
        .set(
          Math.abs(pointer.x - prevMouse.current.x),
          Math.abs(pointer.y - prevMouse.current.y)
        )
        .multiplyScalar(1 / delta);
      damp2(velocity.current, scale.current, 0.4, delta);
      mesh.current.material.uScale = velocity.current.length();

      prevMouse.current.copy(pointer);
    }
  });

  return (
    <Box ref={mesh} scale={2}>
      <customShader
        uTime={0}
        uMouse={new Vector2(0, 0)}
        uScale={1}
        uResolution={
          new Vector2(
            size.width * window.devicePixelRatio,
            size.height * window.devicePixelRatio
          )
        }
        uTexture={texture}
        uTextureHover={textureHover}
        onBeforeCompile={() => console.log("Compiling " + color)}
      />
    </Box>
  );
}
