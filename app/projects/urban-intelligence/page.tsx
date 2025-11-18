import { Metadata } from 'next'
import UrbanIntelligenceDemo from '@/components/demos/UrbanIntelligenceDemo'

export const metadata: Metadata = {
  title: 'Urban Intelligence | Oren Segal',
  description: 'Real-time sentiment + predictive neighborhood analytics combining CityPulse and NextHood',
}

export default function UrbanIntelligencePage() {
  return <UrbanIntelligenceDemo />
}
