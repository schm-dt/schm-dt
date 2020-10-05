import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useSpring, config } from 'react-spring'
import * as THREE from 'three'

import { clamp } from '../lib'
import { skullMaterial } from '../data/materials'

export type SkullProps = {
  mouse?: {
    elX: number
    elY: number
    elW: number
    elH: number
  }
}

export const Skull = ({ mouse }: SkullProps) => {
  const skullRef = useRef<THREE.Object3D>(null)
  const obj = useLoader(OBJLoader, '/obj/3.obj')

  const { elX, elY, elW, elH } = mouse ?? { elX: 0, elY: 0, elW: 0, elH: 0 }
  const w = elW ? elW : window.innerWidth
  const h = elH ? elH : window.innerHeight
  const x = elX ? (elX * 2 - w) / w : 0
  const y = elY ? (elY * 2 - h) / h : 0
  const smoothed = useSpring({ x, y, config: config.gentle })

  useFrame(({ aspect, size, gl }) => {
    const x = smoothed.x.getValue()
    const y = smoothed.y.getValue()

    if (skullRef.current !== null) {
      const scale = clamp(0.9, 1.3, aspect)

      skullRef.current.rotation.y = (x * Math.PI) / 4
      skullRef.current.rotation.x = (y * Math.PI) / 4 - Math.PI / 2
      skullRef.current.children[0].scale.set(scale, scale, scale)

      if (scale < 1.1) {
        skullRef.current.children[0].position.z = 0
      }
    }

    gl.setPixelRatio(size.width < 1600 ? 2 : 1)
  })

  React.useEffect(() => {
    if (obj) {
      const skullMesh = obj.children[0] as THREE.Mesh

      if (skullMesh) {
        skullMesh.material = skullMaterial
      }
    }
  }, [obj])

  return (
    <primitive ref={skullRef} object={obj} position={[0, 0, -20]} rotation={[-Math.PI / 2, 0, 0]} />
  )
}
