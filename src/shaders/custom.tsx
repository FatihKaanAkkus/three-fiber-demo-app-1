import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Texture, Vector2 } from "three";

export const CustomShader = shaderMaterial(
  {
    uTime: 0,
    uMouse: new Vector2(),
    uScale: 1,
    uResolution: new Vector2(),
    uTexture: null,
    uTextureHover: null,
  },
  /** Vertex */ `
    #define GLSLIFY 1

    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  /** Fragment */ `
    #define GLSLIFY 1

    uniform vec2 uMouse;
    uniform float uScale;
    uniform vec2 uResolution;

    uniform sampler2D uTexture;
    uniform sampler2D uTextureHover;

    uniform float uTime;

    varying vec2 vUv;

    float circle(in vec2 dist, in float radius, in float blur) {
      return 1.0 - smoothstep( radius - (radius * blur), radius + (radius * blur), dot(dist, dist) * 4.0);
    }

    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x * 34.0) + 1.0) * x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise3(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
          i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
          i.x + vec4(0.0, i1.x, i2.x, 1.0));

      vec3 ns = 0.142857142857 * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 llx = floor(j * ns.z);
      vec4 lly = floor(j - 7.0 * llx);

      vec4 x = llx * ns.x + ns.yyyy;
      vec4 y = lly * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      vec2 res = uResolution;
      vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
      st.y *= uResolution.y / uResolution.x;

      vec2 mouse = uMouse * -0.5;

      vec2 circlePos = st + mouse;

      float c = circle(circlePos, 0.05 * (0.5 + 0.1 * uScale), 2.5) * (1.0 + uScale);

      float offx = vUv.x - sin(vUv.y + uTime * 0.02);
      float offy = vUv.y - uTime * 0.05 - cos(uTime * 0.001) * 0.002;

      float n = snoise3(vec3(offx, offy, uTime * 0.05) * (10.0 - min(uScale, 5.0))) - 1.0;

      float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.0));

      vec4 image = texture2D(uTexture, vUv);
      vec4 hover = texture2D(uTextureHover, vUv);

      vec4 finalImage = mix(image, hover, finalMask);

      gl_FragColor = finalImage;
    }
  `
);

extend({ CustomShader });

export type CustomShaderUniforms = {
  uTime: number;
  uMouse: Vector2;
  uScale: number;
  uResolution: Vector2;
  uTexture: Texture;
  uTextureHover: Texture;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    customShader: ThreeElements["shaderMaterial"] & CustomShaderUniforms;
  }
}
