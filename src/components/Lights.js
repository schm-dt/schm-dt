import React, { Fragment, useRef } from "react";
import { useFrame } from "react-three-fiber";

const LIGHT_RING_RADIUS = 400;
const TIME_SPEED_MULTIPLIER = 0.5;

export const Lights = () => {
  const redLight = useRef();
  const lightB = useRef();
  const lightC = useRef();

  useFrame(({ clock }) => {
    redLight.current.position.x =
      Math.cos(clock.elapsedTime * TIME_SPEED_MULTIPLIER) * LIGHT_RING_RADIUS;
    redLight.current.position.z =
      Math.sin(clock.elapsedTime * TIME_SPEED_MULTIPLIER) * LIGHT_RING_RADIUS;

    lightB.current.position.x =
      Math.sin(clock.elapsedTime * TIME_SPEED_MULTIPLIER) * LIGHT_RING_RADIUS;
    lightB.current.position.z =
      Math.cos(clock.elapsedTime * TIME_SPEED_MULTIPLIER) * LIGHT_RING_RADIUS;
  });

  return (
    <Fragment>
      <pointLight
        ref={redLight}
        args={[0xff0000, 2]}
        position={[150, 120, 150]}
      />
      <pointLight
        ref={lightB}
        args={[0xe930f2, 1]}
        position={[-150, 50, 150]}
      />
      <pointLight ref={lightC} args={[0xffffff, 0.5]} position={[0, -150, 0]} />
    </Fragment>
  );
};
