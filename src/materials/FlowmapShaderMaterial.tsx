import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Vector2, Vector3, Texture } from "three";

export const FlowmapShaderMaterial = shaderMaterial(
  {
    uResolution: new Vector2(1, 1),
    uTime: 0, // changed from uFrame to uTime
    uMouse: new Vector3(0, 0, 0), // (xy = pos, z = pressed)
    uTexture: new Texture(),
    // Add more channels if needed
    delta: 1.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uMouse;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec2 mouse = uMouse.xy;
    float ripple = 0.0;
    vec2 uv = vUv;
    float dist = distance(vUv, mouse);
    ripple = 0.5 + 0.5 * cos(40.0 * dist - 10.0 * uTime);
    ripple *= smoothstep(0.2, 0.0, dist);
    // Distort UVs based on ripple
    uv += 0.03 * ripple * normalize(vUv - mouse);
    vec3 tex = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(tex, 1.0);
  }
  `
);

extend({ FlowmapShaderMaterial });

export type FlowmapShaderUniforms = {
  uResolution: Vector2;
  uTime: number;
  uMouse: Vector3;
  uTexture: Texture;
  delta: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    flowmapShaderMaterial: ThreeElements["shaderMaterial"] &
      FlowmapShaderUniforms;
  }
}
