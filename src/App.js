import React, { Fragment, Suspense, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "react-three-fiber";
import { useWindowScroll, useMouse } from "react-use";
import { useSpring, animated } from "react-spring";

import Intro from "./components/Intro";
import Experiences from "./components/Experiences";
import { Skull } from "./components/Skull";
import { BackgroundPanel } from "./components/BackgroundPanel";
import { Lights } from "./components/Lights";

const CanvasContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CAMERA_CONFIG = {
  fov: 45,
  near: 1,
  far: 2000,
  position: [0, 400, 0],
};

const getOpacityFromY = (y) =>
  (y === undefined ? y : window.scrollY) > window.innerHeight / 2 ? 0.2 : 1;

export default () => {
  const canvasRef = useRef();

  const { y } = useWindowScroll();

  const mouse = useMouse(canvasRef);

  const canvasStyles = useSpring({
    from: {
      opacity: getOpacityFromY(y),
    },
    opacity: getOpacityFromY(y),
  });

  return (
    <Fragment>
      <CanvasContainer
        id="canvas-container"
        ref={canvasRef}
        style={canvasStyles}
      >
        <Canvas camera={CAMERA_CONFIG}>
          <BackgroundPanel />
          <Lights />
          <Suspense fallback={null}>
            <Skull mouse={mouse} />
          </Suspense>
        </Canvas>
      </CanvasContainer>
      <Intro />
      <Experiences />
    </Fragment>
  );
};
