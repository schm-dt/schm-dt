import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useSpring, config } from "react-spring";

import { clamp } from "../lib";
import { skullMaterial } from "../data/materials";

export const Skull = ({ mouse }) => {
  const skullRef = useRef();
  const obj = useLoader(OBJLoader, "/obj/3.obj");

  const { elX, elY, elW, elH } = mouse;
  const w = elW ? elW : window.innerWith;
  const h = elH ? elH : window.innerHeight;
  const x = elX ? (elX * 2 - w) / w : 0;
  const y = elY ? (elY * 2 - h) / h : 0;
  const smoothed = useSpring({ x, y, config: config.gentle });

  useFrame(({ aspect, size, gl }) => {
    const x = smoothed.x.value;
    const y = smoothed.y.value;

    if (skullRef.current) {
      const scale = clamp(0.9, 1.3, aspect);

      skullRef.current.rotation.y = (x * Math.PI) / 4;
      skullRef.current.rotation.x = (y * Math.PI) / 4 - Math.PI / 2;
      skullRef.current.children[0].scale.set(scale, scale, scale);

      if (scale < 1.1) {
        skullRef.current.children[0].position.z = 0;
      }
    }

    gl.setPixelRatio(size.width < 1600 ? 2 : 1);
  });

  obj.children[0].material = skullMaterial;

  return (
    <primitive
      ref={skullRef}
      object={obj}
      position={[0, 0, -20]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
};
