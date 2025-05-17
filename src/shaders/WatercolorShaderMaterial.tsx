import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Color, type ColorRepresentation } from "three";

export const WatercolorShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new Color(0.8, 0.6, 0.4),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float noise = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
      vec3 watercolor = color * (0.8 + 0.2 * noise);
      gl_FragColor = vec4(watercolor, 1.0);
    }
  `
);

extend({ WatercolorShaderMaterial });

export type WatercolorShaderUniforms = {
  time: number;
  color: ColorRepresentation;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    watercolorShaderMaterial: ThreeElements["shaderMaterial"] &
      WatercolorShaderUniforms;
  }
}
