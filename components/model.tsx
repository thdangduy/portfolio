"use client";
import React, { useRef } from "react";
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import _ from "lodash";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useControls } from "leva";
export const Model = () => {
  const mesh = useRef<Mesh>();
  const { nodes } = useGLTF("/torrus.glb");
  const { viewport } = useThree();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.05;
    }
  });

  const materialProps = {
    thickness: 0.2,
    roughness: 0.2,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.02,
    backside: true,
  };

  return (
    <group scale={viewport.width / 3.5}>
      <Text
        fontSize={0.532}
        font="/fonts/PPNeueMontreal-Bold.otf"
        position={[0, 0, -0.5]}
      >
        `It&apos;s Avisek`
      </Text>
      {/* @ts-ignore */}
      <mesh ref={mesh} {..._.omit(nodes.Torus002, "children")}>
        <MeshTransmissionMaterial {...materialProps} color={"#FF197A"} />
      </mesh>
    </group>
  );
};
