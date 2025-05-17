import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Color, type ColorRepresentation } from "three";

export const CustomShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new Color(0.2, 0.0, 0.1),
  },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
);

extend({ CustomShaderMaterial });

export type CustomShaderUniforms = {
  time: number;
  color: ColorRepresentation;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    customShaderMaterial: ThreeElements["shaderMaterial"] &
      CustomShaderUniforms;
  }
}
