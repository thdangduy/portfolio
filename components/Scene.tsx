// "use client";
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { Model } from "@/components/model";
// import { Environment } from "@react-three/drei";
// export default function Scene() {
//   return (
//     <Canvas>
//       <directionalLight intensity={3} position={[0, 3, 2]} />
//       <Environment preset="city" />
//       <Model />
//     </Canvas>
//   );
// }
import Spline from "@splinetool/react-spline/next";

export default function Scene() {
  return (
    <div className="w-screen h-screen">
      <Spline scene="https://prod.spline.design/KdwIeQpNBMPOlIAE/scene.splinecode" />
    </div>
  );
}
