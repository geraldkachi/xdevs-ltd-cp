'use client'
// Rotating planet — adapted from github.com/geraldkachi/3d (components/canvas/Earth.tsx)
// Model: "Stylized planet" by cmzw (sketchfab.com/cmzw), CC-BY-4.0
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Planet() {
  const earth = useGLTF('/planet/scene.gltf')
  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
}

export default function EarthCanvas() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }} gl={{ alpha: true }}>
      <Suspense fallback={null}>
        <OrbitControls autoRotate autoRotateSpeed={1.2} enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Planet />
      </Suspense>
    </Canvas>
  )
}
