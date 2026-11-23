'use client'
import dynamic from 'next/dynamic'

const StarsCanvas = dynamic(() => import('./three/Stars'), { ssr: false })
const EarthCanvas = dynamic(() => import('./three/Earth'), { ssr: false })

export function SpaceStars() { return <StarsCanvas color="#f272c8" count={3500} size={0.0022} /> }
export function SpacePlanet() { return <EarthCanvas /> }
