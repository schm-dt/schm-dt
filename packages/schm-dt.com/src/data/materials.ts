import * as THREE from 'three'

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
})
