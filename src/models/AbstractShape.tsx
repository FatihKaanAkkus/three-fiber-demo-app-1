import type { ObjectMap, ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { GLTF } from "three-stdlib";

const modelPath = "assets/models/Geometric_Harmony_Bal_0513181426_texture.glb";

type AbstractShapeGLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      mesh_0: Mesh;
    };
    materials: object;
  };

export function AbstractShape({
  children,
  ref,
  ...props
}: ThreeElements["group"]) {
  const { nodes } = useGLTF(modelPath) as AbstractShapeGLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        ref={ref}
      >
        {children}
      </mesh>
    </group>
  );
}

useGLTF.preload(modelPath);
