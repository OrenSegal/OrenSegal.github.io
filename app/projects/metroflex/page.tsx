import { Metadata } from 'next'
import MetroFlexDemo from '@/components/demos/MetroFlexDemo'

export const metadata: Metadata = {
  title: 'MetroFlex | Oren Segal',
  description: 'Context-aware dynamic transit routing applying Binge Optimizer methodology to NYC transit',
}

export default function MetroFlexPage() {
  return <MetroFlexDemo />
}
