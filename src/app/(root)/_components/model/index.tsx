'use client'
import { gsap } from 'gsap'
import type { Mesh } from 'three'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'

// import {useHelper } from '@react-three/drei'
// import { DirectionalLight, DirectionalLightHelper, PointLight, PointLightHelper, SpotLight, SpotLightHelper } from 'three'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Model() {
  /* Object Refs */
  const { gl } = useThree()
  const mesh = useRef<Mesh>(null)

  /* Light Refs */
  // const spotLightRef = useRef<SpotLight>(null!)
  // const pointLightRef = useRef<PointLight>(null!)
  // const directionalLightRef = useRef<DirectionalLight>(null!)

  /* Helpers */
  // useHelper(spotLightRef, SpotLightHelper, '#DB2500')
  // useHelper(pointLightRef, PointLightHelper, 0.25, 'blue')
  // useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'indigo')

  /* Charge the Object 3D */
  const { scene, animations } = useGLTF('/3D/bb8.glb')
  const { actions, mixer } = useAnimations(animations, mesh)

  /* Start the Animation */
  useEffect(() => {
    if (actions['Animation']) {
      actions['Animation'].play().paused = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Update the Animation Mixer */
  useFrame((_, delta) => {
    mixer.update(delta) // Always we need to update the mixer
  })

  /* Animation on Scroll */
  useGSAP(
    () => {
      const canvas = gl.domElement

      gsap.to(canvas, {
        scrollTrigger: {
          trigger: canvas,
          start: 'top top',
          end: '+=5000',
          pin: true,
          scrub: 0.5,

          /* self is the ScrollTrigger instance */
          onUpdate: (self) => {
            if (actions['Animation']) {
              const { progress } = self
              const totalDuration = actions['Animation'].getClip().duration

              // actions['Animation'].time = actions['Animation'].getClip().duration * progress

              let animationTime
              if (progress <= 0.8) {
                //  for -> progress <= 0.5
                //  animationTime = totalDuration * progress * 1.4

                animationTime = totalDuration * progress * 1.1
              } else {
                // animationTime = totalDuration * (0.7 + 0.3 * (progress - 0.5) * 2)

                animationTime = totalDuration * (0.88 + 0.12 * (progress - 0.8) * 5)

                /* Handle the Opacity */
                canvas.style.opacity = `${1 - (progress - 0.8) * 5}`
              }

              actions['Animation'].time = animationTime
            }
          },
        },
      })
    },
    { dependencies: [] },
  )

  return (
    <>
      <spotLight
        // ref={spotLightRef}
        intensity={3}
        position={[0, 0, 5]}
        angle={0.15}
        penumbra={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        // ref={pointLightRef}
        intensity={2}
        position={[0, 0, 3]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      <directionalLight
        // ref={directionalLightRef}
        intensity={0.5}
        position={[0, 0, 1]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <mesh
        ref={mesh}
        dispose={null}
        position={[0, -0.25, 0]}
      >
        <primitive object={scene} />
      </mesh>
    </>
  )
}
