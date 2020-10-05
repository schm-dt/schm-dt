import React from "react";

import { skullMaterial } from "../data/materials";

export const BackgroundPanel = () => {
  return (
    <mesh position={[0, -100, 0]} material={skullMaterial}>
      <boxGeometry args={[500, 0, 150]} />
    </mesh>
  );
};
