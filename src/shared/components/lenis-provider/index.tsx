'use client'
import { ReactLenis } from 'lenis/react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 0.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
