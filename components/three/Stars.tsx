'use client'
// Moving star field — adapted from github.com/geraldkachi/3d (components/canvas/Stars.tsx)
import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { inSphere } from 'maath/random'
import type { Points as PointsType } from 'three'

function Field({ color, count, size, reduced }: { color: string; count: number; size: number; reduced: boolean }) {
  const ref = useRef<PointsType>(null)
  const [sphere] = useState(() => inSphere(new Float32Array(count * 3), { radius: 1.2 }) as Float32Array)
  useFrame((_, delta) => {
    if (!ref.current || reduced) return
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export default function StarsCanvas({ color = '#ffffff', count = 2500, size = 0.0028 }: { color?: string; count?: number; size?: number }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.75]} gl={{ antialias: false, alpha: true }}>
        <Suspense fallback={null}>
          <Field color={color} count={count} size={size} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
