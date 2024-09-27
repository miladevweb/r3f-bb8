'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { Model } from '../index'
import { Loader } from '@/shared/components'

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ height: '100vh', width: '100vw' }}
    >
      <PerspectiveCamera
        makeDefault
        fov={75}
        near={0.1}
        far={100}
        position={[0, 0, 0.5]}
        aspect={window.innerWidth / window.innerHeight}
      />

      <ambientLight intensity={0.5} />

      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>

      <OrbitControls
        enableDamping
        enableZoom={false}
        dampingFactor={0.1}
        makeDefault
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
