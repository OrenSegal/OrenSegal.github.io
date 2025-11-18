import { Metadata } from 'next'
import BingeOptimizerDemo from '@/components/demos/BingeOptimizerDemo'

export const metadata: Metadata = {
  title: 'Binge Optimizer | Oren Segal',
  description: 'Context-aware streaming recommendations that understand your viewing moment',
}

export default function BingeOptimizerPage() {
  return <BingeOptimizerDemo />
}
