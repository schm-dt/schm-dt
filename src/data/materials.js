import * as THREE from "three";

export const skullMaterial = new THREE.MeshPhysicalMaterial({
  map: null,
  color: 0x0d0b16,
  metalness: 0.1,
  roughness: 0,
  opacity: 0.9,
  side: THREE.FrontSide,
  transparent: true,
  reflectivity: 0.5,
  premultipliedAlpha: true,
});

export const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x000000,
  clearCoat: 1,
  reflectivity: 1,
  transparent: true,
  opacity: 0.1,
  side: THREE.DoubleSide,
});

export const videoMaterial = (videoEl) => {
  let texture = new THREE.VideoTexture(videoEl);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide });
};
