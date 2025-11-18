import { Metadata } from 'next'
import TrainBrainDemo from '@/components/demos/TrainBrainDemo'

export const metadata: Metadata = {
  title: 'TrainBrain | Oren Segal',
  description: 'Adaptive fitness intelligence that learns from your performance',
}

export default function TrainBrainPage() {
  return <TrainBrainDemo />
}
