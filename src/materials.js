import * as THREE from 'three'

export const skullMaterial = new THREE.MeshPhysicalMaterial({
    map: null,
    color: 0x0D0B16,
    metalness: 0.2,
    roughness: 0,
    opacity: 0.7,
    side: THREE.FrontSide,
    transparent: true,
    reflectivity: 1,
    premultipliedAlpha: true,
  })

export const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    clearCoat: 1,
    reflectivity: 1,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide
})