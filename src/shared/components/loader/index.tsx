'use client'
import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html
      as="div"
      center
      style={{
        fontSize: 20,
        color: 'white',
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      {progress ? `${progress.toFixed(2)}%` : 'Loading....'}
    </Html>
  )
}
