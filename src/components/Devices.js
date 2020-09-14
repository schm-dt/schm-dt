import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
import * as OBJLoader from "three-obj-loader";

import { smoothOrientation, smoothMouse } from "../lib";
import { videoMaterial } from "../data/materials";
import loopvideo from "../media/mandt.mp4";

const Video = styled.video`
  position: fixed;
  top: 100%;
  height: 0;
  width: 0;
  left: 100%;
  opacity: 0;
`;

const Canvas = styled.canvas`
  @media screen and (min-width: 960px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: 959px) {
    position: static;
  }
`;

OBJLoader(THREE);
const lightRingRadius = 400;

class Devices extends Component {
  constructor(props) {
    super(props);
    this.root = React.createRef();
    this.canvas = React.createRef();
    this.loopvideo = React.createRef();

    this.THREE = THREE;

    this.camera = null;
    this.scene = null;
    this.renderer = null;

    this.pointLight1 = null;
    this.pointLight2 = null;
    this.pointLight3 = null;
    this.pointLight4 = null;

    this.loader = new this.THREE.OBJLoader();
  }

  async init() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.camera.position.y = 400;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000);
    this.scene.background = 0x020204;
    this.scene.add(this.camera);

    this.loopvideo.current.play();

    const displayGeo = new THREE.PlaneGeometry(2.4, 4.35, 1);
    const display = new THREE.Mesh(
      displayGeo,
      videoMaterial(this.loopvideo.current)
    );

    this.screen = new THREE.Group();
    this.screen.add(display);
    this.screen.rotateX(-1.5708);
    this.screen.rotateY(0);
    this.screen.rotateZ(0);
    this.screen.position.set(0, 0.16, 0);

    // Group all devices using this 'focus' group
    const focus = new THREE.Group();
    this.focus = focus;
    this.updateDevicePosition();

    this.scene.add(this.focus);

    this.addLights();
    await this.addDevice();

    this.initialiseRenderer();

    window.addEventListener("resize", () => {
      this.updateRenderer();
    });
  }

  // Load in phone
  addDevice() {
    return new Promise((resolve, reject) => {
      this.loader.load("/obj/pixel.obj", (object) => {
        this.phone = object;
        this.phone.position.y = 0;
        this.phone.scale.set(1, 0.9, 1);
        this.phone.lookAt(this.camera.position);

        this.device = new THREE.Group();
        this.device.add(this.phone);
        this.device.add(this.screen);

        this.device.scale.set(20, 20, 20);

        this.focus.add(this.device);
        resolve();
      });
    });
  }

  // Load lights
  addLights() {
    this.pointLight1 = new THREE.PointLight(0xff0000, 1);
    this.pointLight1.position.set(150, 0, 150);

    this.pointLight2 = new THREE.PointLight(0x0000ff, 1);
    this.pointLight2.position.set(-150, 0, 150);

    this.pointLight3 = new THREE.PointLight(0xffffff, 0.2);
    this.pointLight3.position.set(50, 0, 100);

    this.pointLight4 = new THREE.PointLight(0xffffff, 0.2);
    this.pointLight4.position.set(-50, 0, -100);

    this.focus.add(this.pointLight1);
    this.focus.add(this.pointLight2);
    this.focus.add(this.pointLight3);
    this.focus.add(this.pointLight4);
  }

  initialiseRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas.current,
    });
    this.renderer.setClearColor(0xffffff, 0);
    this.updateRenderer();
  }

  updateRenderer() {
    const width = window.innerWidth;
    if (window.innerWidth >= 600) {
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    } else {
      let height = width;
      if (height < 500) height = 500;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
    this.renderer.setPixelRatio(window.innerWidth < 1600 ? 2 : 1);
    this.updateDevicePosition();
  }
  updateDevicePosition() {
    this.focus.position.y = 200;
    if (window.innerWidth >= 960) {
      this.focus.position.x = 50;
    } else {
      this.focus.position.x = 0;
    }
  }
  updateDeviceRotation() {
    if (this.props.isTouchDevice) {
      this.focus.rotation.z =
        -smoothOrientation(this.props.orientation).gamma * 0.01744444444;
    } else {
      this.focus.rotation.z = -smoothMouse(this.props.mouse).x * 0.5;
      this.focus.rotation.x = -smoothMouse(this.props.mouse).y * 0.5 + 0.2;
    }
  }
  animate() {
    if (this.props.isVisible) {
      const timer = Date.now() / 1000;

      if (this.pointLight1) {
        this.pointLight1.position.x = Math.cos(timer) * lightRingRadius;
        this.pointLight1.position.z = Math.sin(timer) * lightRingRadius;
      }

      if (this.pointLight2) {
        this.pointLight2.position.x = Math.sin(timer) * lightRingRadius;
        this.pointLight2.position.z = Math.cos(timer) * lightRingRadius;
      }

      this.updateDevicePosition();
      this.updateDeviceRotation();

      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    }
    requestAnimationFrame(this.animate.bind(this));
  }
  async componentDidMount() {
    await this.init();
    this.animate();
  }
  render() {
    const { className } = this.props;

    return (
      <div className={className} ref={this.root}>
        <Canvas ref={this.canvas} />
        <Video
          ref={this.loopvideo}
          src={loopvideo}
          loop={true}
          muted={true}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default Devices;
