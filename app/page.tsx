import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ClientsBar from '@/components/ClientsBar'
import Services from '@/components/Services'
import TeamSection from '@/components/TeamSection'
import VideoSection from '@/components/VideoSection'
import StatsSection from '@/components/StatsSection'
import AcademyTeaser from '@/components/AcademyTeaser'
import Process from '@/components/Process'
import TechStack from '@/components/TechStack'
import OpenRolesTeaser from '@/components/OpenRolesTeaser'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'XDEVS — Software, Data & AI Engineering',
  description: 'XDEVS engineers bespoke software, data, and AI solutions that scale, perform, and evolve with your ambitions — and trains new tech talent through XDEVS Academy.',
  alternates: { canonical: 'https://xdevs.io' },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientsBar />
        <Services />
        <VideoSection />
        <TeamSection />
        <StatsSection />
        <AcademyTeaser />
        <Process />
        <OpenRolesTeaser />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
